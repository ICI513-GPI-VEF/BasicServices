// Import dependencies

import db from "../models/index.js"
//const db       = require("../models");
const Provider = db.provider;
const Op       = db.Sequelize.Op;

// Create a provider
const create = (req, res) => 
{
    // Validate query
    if (!req.body.id_user || !req.body.overview) {
        res.status(400).send({ status: 400, message: "Each parameter of the body must not be empty!" });
        return;
    }
    // Create a proveedor
    const provider = {
        overview: req.body.overview,
        id_user:  req.body.id_user
    };

    // Store in database
    Provider.create(provider) // Okay? then return the data
    .then(data => {
        res.status(201).send({ status: 201, message: "Created provider", data: data });
    })
    .catch(err => {     // error 500: 
        res.status(500).send({ status: 500, message: err.message || "Error creating a provider"});
    });
};

// Return the providers from the database
const findAll = (req, res) =>
{
    const {first, last}  = req.query; //...../all?first=ja
    var condition = (first || last)? { [Op.or]: [{ name: {[Op.like]: `%${first}%`} }, { last_name: {[Op.like]: `%${last}%`} }] } : null;

    Provider.findAll({
        attributes: { exclude: ["id_user", "createdAt", "updatedAt"] },
        include: [{
            model: db.user,
            as: 'providerUser',
            attributes: { exclude: ["password", "id_user"] },
            where: condition
        }]
    })
    .then(data => {
        if (data.length) res.status(200).send({ status: 200, message: "Providers found",         data: data });
        else             res.status(200).send({ status: 200, message: "There are no providers",  data: []   });
    })
    .catch(err => {
        res.status(500).send({ status: 500, message: err.message || "Search providers error"});
    });
};


// Search provider by fk
const findOne = (req, res) => 
{
    const id_user = req.params.id_user;
    var condition = { id_user: {[Op.eq]: id_user} };

    Provider.findOne({
        attributes: { exclude: ["createdAt", "updatedAt", "id_user"]},
        where: condition,
        include: [{
            model: db.experience,
            as: 'providerExperiences',
            attributes: { exclude: ["id_provider", "id_experience", "createdAt", "updatedAt"] }
        }]
    })
    .then(data => {
        if (data) res.status(200).send({ status: 200, message: "Provider found", data: data }); // Does the data exist? deliver the data
        else      res.status(404).send({ status: 404, message: "Provider not found" });
    })
    .catch(err => {
        res.status(500).send({ status: 500, message: err.message || "Search provider error"});
    });
};

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

export { create, findAll, findOne };