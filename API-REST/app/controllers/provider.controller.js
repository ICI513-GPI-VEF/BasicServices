// Import dependencies

import db from "../models/index.js"
import { updateClient } from "./client.controller.js";
//const db       = require("../models");
const Provider = db.provider;
const Op       = db.Sequelize.Op;

// Create a provider with a client created already
async function create(req, res)
{
    const {okey, status, message, data} = await createProvider(req.body);
    return res.status(status).send({ okey: okey, status: status, message: message, data: data });
}

async function createProvider(body)
{
// Check available params
    const dataRequired = () => { return body.overview && body.id_client && body.typeClient; };
    if (!dataRequired())
        return {okey: false, status: 400, message: "Create provider: Each parameter of the body must not be empty!", data: {} };

// Check existing provider
    var response = await findExistingProvider(body.id_client);
    if (response.okey)
        return { okey: false, status: 409, message: "Conlict: existing provider", data: {} };
    else if (response.status == 500)
        return { okey: response.okey, status: response.status, message: response.message, data: response.data };

// Update 'typeClient' from associated client 
    if (body.typeClient == 1){
        response = await updateClient(body.id_client, {typeClient: 2})
        if (!response.okey)
            return { okey: response.okey, status: response.status, message: response.message, data: response.data };
    }

// Create a provider
    const provider = {
        overview:   body.overview,
        id_client:  body.id_client
    };

// Store in database
    await Provider.create(provider) // Okay? then return the data
    .then(data => {
        response = { okey: true, status: 201, message: "Created provider client", data: data }
    })
    .catch(err => {     // error 500: 
        response = { okey: false, status: 500, message: err.message + ". Error creating a provider client", data: {} };
    });

    return response;
}

// Know if there existing provider by id client
async function findExistingProvider(id_client)
{
    var response;

    await Provider.findOne({
        where: { id_client: {[Op.eq]: id_client} }
    })
    .then(data => {
        if (data)   response = { okey: true,  status: 200, message: "Provider found",     data: {} };
        else        response = { okey: false, status: 200, message: "Provider not found", data: {} };
    })
    .catch(err => {
        response = { okey: false, status: 500, message: err.message + ". Search provider error", data: {} };
    });

    return response;
}


// Return the providers from the database
async function findAll(req, res)
{
    const {first, last}  = req.query; //...../all?first=ja
    var condition = (first || last)? { [Op.or]: [{ name: {[Op.like]: `%${first}%`} }, { last_name: {[Op.like]: `%${last}%`} }] } : null;

    Provider.findAll({
        attributes: { exclude: ["id_client", "createdAt", "updatedAt"] },
        include: [{
            model: db.client,
            as: 'providerClient',
            attributes: { exclude: ["password", "id_client"] },
            where: condition
        }]
    })
    .then(data => {
        if (data.length) res.status(200).send({ okey: true, status: 200, message: "Providers found",         data: data });
        else             res.status(200).send({ okey: true, status: 200, message: "There are no providers",  data: []   });
    })
    .catch(err => {
        res.status(500).send({ okey: false, status: 500, message: err.message + ". Search providers error", data: [] });
    });
}


// Search provider by fk
async function findOne(req, res)
{
    const id_client = req.params.id_client;
    var condition   = { id_client: {[Op.eq]: id_client} };

    Provider.findOne({
        attributes: { exclude: ["createdAt", "updatedAt", "id_client"]},
        where: condition,
        include: [{
            model: db.experience,
            as: 'providerExperiences',
            attributes: { exclude: ["id_provider", "id_experience", "createdAt", "updatedAt"] }
        }]
    })
    .then(data => {
        if (data) res.status(200).send({ okey: true,  status: 200, message: "Provider found",     data: data }); // Does the data exist? deliver the data
        else      res.status(404).send({ okey: false, status: 404, message: "Provider not found", data: {} });
    })
    .catch(err => {
        res.status(500).send({ okey: false, status: 500, message: err.message + ". Search provider error", data: {} });
    });
}

//// actualizar un provedor por su id
//exports.update = (req, res) => 
//{
//    const id_prov = req.params;
//
//    Provider.update(req.body, { where: { id_provider: id_prov }})
//    .then(num => {
//        if (num == 1) res.send({ message: "Proveedor actualizado."});
//        else          res.send({ message: `No se pudo actualizar al proveedor`});
//    })
//    .catch(err => {
//        res.status(500).send({ message: "Error en actualización"});
//    });
//     
//};
//
//// eliminar un provedor
//exports.delete = (req, res) =>
//{
//    const id_prov = req.params;
//
//    Provider.destroy({where: { id_provider: id_prov }})
//    .then(num => {
//        if (num == 1) res.send({ message: "Proveedor eliminado" });
//        else          res.send({ message: `Proveedor no encontrado`});
//    })
//    .catch(err => {
//        res.status(500).send({ message: "Error al eliminar proveedor"});
//    });
//};
//
//// eliminar a todos los proveedores
//exports.deleteAll = (req, res) => 
//{
//    Provider.destroy({ where: {}, truncate: false })
//    .then(nums => {
//        res.send({ message: `${nums} proveedores eliminados!` });
//    })
//    .catch(err => {
//        res.status(500).send({ message: err.message || "Error al eliminar a todos los proveedores." });
//    });
//    
//};

export { create, createProvider, findAll, findOne};