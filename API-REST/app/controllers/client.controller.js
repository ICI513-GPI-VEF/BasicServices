// Import dependencies
//const db = require("../models");
import db from "../models/index.js";
import { createProvider } from "../controllers/provider.controller.js";

const Client = db.client;
const Op     = db.Sequelize.Op;

// Create a client
async function create(req, res)
{
// Validate query
    const dataRequired = () => {
        return (req.body.name    && req.body.last_name && req.body.address  && 
                req.body.contact && req.body.email     && req.body.password && req.body.typeClient);
    };
    if (!dataRequired()) {
        res.status(400).send({ okey: false, status: 400, message: "Create client: Each parameter of the body must not be empty!", data: {} });
        return;
    }
// If also create provider client (typeClient=1), check if overview param is not empty
    const isProviderWithoutOverview = () => { return req.body.typeClient == 2 && !req.body.overview; }
    if (isProviderWithoutOverview()){
        res.status(400).send({ okey: false, status: 400, message: "Create provider client: 'overview' param of the body must not be empty!", data: {} });
        return;
    }

// Create a client
    const client = {
        name:       req.body.name,
        last_name:  req.body.last_name,
        address:    req.body.address,
        contact:    req.body.contact,
        email:      req.body.email,
        password:   req.body.password,
        typeClient: req.body.typeClient
    };

// Store in database
    Client.create(client) // Okay? then return the data
    .then(async (data) =>
    {
        if (data.typeClient == 2)  // Also create provider account?
        {
            const body     = { id_client: data.id_client, overview: req.body.overview, typeClient: data.typeClient };
            const response = await createProvider(body, res); // { okey, status, message, data }

            if (response.okey) { // Join data 
                const totalData = [ data, response.data ];
                res.status(response.status).send({ okey: response.okey, status: response.status, message: response.message, data: totalData });
            }
            else {  // Drop client!!
                const response2 = await dropClient(data.id_client);
                res.status(response.status).send({ okey: response.okey, status: response.status, message: response.message + ". " + response2.message, data: response.data });
            }
        }
        else res.status(201).send({ okey: true, status: 201, message: "Created client", data: data });
    })
    .catch(err => {     // Error 500: 
        res.status(500).send({ okey: false, status: 500, message: err.message + ". Error creating a client"});
    });
}

const filter = (req) =>
{
    const {first, last, typeClient} = req.query;

    if (first && last && typeClient)   return {[Op.and]: [{ name: { [Op.like]: `%${first}%` } }, { last_name: {[Op.like]: `%${last}%`} }, { typeClient: { [Op.like]: `%${typeClient}%`} }]};
    else if (first && last)            return {[Op.and]: [{ name: { [Op.like]: `%${first}%` } }, { last_name: { [Op.like]: `%${last}%`} }]};
    else if (first && typeClient)      return {[Op.and]: [{ name: { [Op.like]: `%${first}%` } }, { typeClient: { [Op.like]: `%${typeClient}%`} }]};
    else if (last && typeClient)       return {[Op.and]: [{ last_name: { [Op.like]: `%${last}%`} }, { typeClient: { [Op.like]: `%${typeClient}%`} }]};
    else  
        return (first || last || typeClient)? {[Op.or]: [{ name: { [Op.like]: `%${first}%`}}, { last_name: { [Op.like]: `%${last}%` }}, {typeClient: { [Op.like]: `%${typeClient}%`}}]} : null;
};

// Return the users from the database
async function findAll(req, res)
{
    const condition = filter(req);

    Client.findAll({ where: condition, attributes:{ exclude:['password']} }) // Find the tuples that match the code
    .then(data => {
        if (data.length) res.status(200).send({ okey: true, status: 200, message: "Clients found",        data: data });
        else             res.status(200).send({ okey: true, status: 200, message: "There are no clients", data: []   });
    })
    .catch(err => {
        res.status(500).send({ okey: false, status: 500, message: err.message + ". Search client error", data: [] });
    });
}

// Search client by email and password
async function findOne(req, res)
{
    const { email, password } = req.body;

    // Verify all body params not empty
    if (!(email && password)) {
        res.status(400).send({ okey: false, status: 400, message: "Each query param must be not empty!", data: {} });
        return;
    }

    const condition = { [Op.and]: [{ email: {[Op.eq]: email} }, { password: {[Op.eq]: password} }] };

    Client.findOne({
        attributes: { exclude: ["password", "createdAt", "updatedAt"]},
        where: condition
    })
    .then(data => {
        if (data) res.status(200).send({ okey: true,  status: 200, message: "Client found",     data: data }); // Does the data exist? deliver the data
        else      res.status(404).send({ okey: false, status: 404, message: "Client not found", data: {} });
    })
    .catch(err => {
        res.status(500).send({ okey: false, status: 500, message: err.message + ". Search client error", data: {} });
    });
}


// Update client by id
async function update(req, res)
{
    const { updated, status, message, data } = await updateClient(req.params.id, req.body);
    return res.status(status).send({ okey: updated, status: status, message: message, data: data });
}

async function updateClient(id, body)
{   
    var response;

    await Client.update(body, { where: {id_client: id} })
    .then(num => {
        if (num == 1)   response = { okey: true,  status: 200, message: "Updated client",             data: num };
        else            response = { okey: false, status: 404, message: "Client not found to update", data: num };
    })
    .catch(err => {
        response = { okey: false, status: 500, message: err.message + ". Error updating client", data: 0 };
    });

    return response;
}


// Delete a client by id
async function drop(req, res)
{
    const { okey, status, message, data } = await dropClient(req.params.id);
    res.status(status).send({ okey: okey, status: status, message: message, data: data });
}

async function dropClient(id)
{   
    var response;

    await Client.destroy({ where: { id_client: id } })
    .then(num => {
        if (num)    response = { okey: true,  status: 200, message: "Deleted client",             data: num };
        else        response = { okey: false, status: 404, message: "Client not found to delete", data: num };
    })
    .catch(err => {
        response = { okey: false, status: 500, message: err.message + ". Error when deleting client", data: 0 };
    });

    return response;
}

//// Delte all clients
//exports.deleteAll = (req, res) => 
//{
//    User.destroy({ where: {}, truncate: false })
//    .then(nums => {
//        res.send({ message: `${nums} usuarios eliminados!` });
//    })
//    .catch(err => {
//        res.status(500).send({ message: err.message || "Error al eliminar a todos los usuarios." });
//    });
//};

export { create, findAll, findOne, update, updateClient, drop, dropClient};