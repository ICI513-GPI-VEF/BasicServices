// Import dependencies
//const db = require("../models");
import db from "../models/index.js"
const User = db.user;
const Op = db.Sequelize.Op;

// Create a user
const create = (req, res) => 
{
    // Validate query
    if (!req.body.name && !req.body.last_name && !req.body.address && !req.body.contact && !req.body.alias && !req.body.password) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a user
    const user = {
        name:       req.body.name,
        last_name:  req.body.last_name,
        address:    req.body.address,
        contact:    req.body.contact,
        alias:      req.body.alias,
        password:   req.body.password
    };

    // Store in database
    User.create(user) // Okay? then return the data
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {     // Error 500: 
        res.status(500).send({ message: err.message || "Error creating a user"});
    });
};

const filter = (req) =>
{
    const {first, last, address} = req.query;

    if (first && last && address)   return {[Op.and]: [{ name: { [Op.like]: `%${first}%`}}, { last_name: { [Op.like]: `%${last}%`}}, { address: { [Op.like]: `%${address}%`}}]};
    else if (first && last)         return {[Op.and]: [{ name: { [Op.like]: `%${first}%`}}, { last_name: { [Op.like]: `%${last}%`}}]};
    else if (first && address)      return {[Op.and]: [{ name: { [Op.like]: `%${first}%`}}, { address: { [Op.like]: `%${address}%`}}]};
    else if (last && address)       return {[Op.and]: [{ last_name: { [Op.like]: `%${last}%`}}, { address: { [Op.like]: `%${address}%`}}]};
    else  
        return (first || last || address)? {[Op.or]: [{ name: { [Op.like]: `%${first}%`}}, { last_name: { [Op.like]: `%${last}%` }}, {address: { [Op.like]: `%${address}%`}}]} : null;
}

// Return the users from the database
const findAll = (req, res) => 
{
    var condition = filter(req);

    User.findAll({ where: condition, attributes:{ exclude:['password']} }) // Find the tuples that match the code
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Search error"});
    });
}

// Search user by alias and password
const findOne = (req, res) => 
{
    const { alias, password } = req.body;

    // Verify params not empty
    if (!alias || !password) {
        res.status(400).send({ message: "All params query must be not empty!" });
        return;
    }

    var condition = { [Op.and]: [{ alias: {[Op.eq]: alias} }, { password: {[Op.eq]: password} }] };

    User.findOne({
        attributes: { exclude: ["password", "createdAt", "updatedAt"]},
        where: condition
    })
    .then(data => {
        if (data) res.status(200).send(data); // Does the data exist? deliver the data
        else      res.status(404).send({ message: `User not found`});
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Search error"});
    });
};
//
//// actualizar un usuario por su id
//exports.update = (req, res) => 
//{
//    const id = req.params.rut;
//
//    User.update(req.body, { where: { rut: id }})
//    .then(num => {
//        if (num == 1) res.send({ message: "Usuario actualizado."});
//        else          res.send({ message: `No se pudo actualizar al usuario`});
//        
//    })
//    .catch(err => {
//        res.status(500).send({ message: "Error en actualización"});
//    });
//};
//
//// eliminar un cliente
//exports.delete = (req, res) => 
//{
//    const id = req.params.rut;
//    User.destroy({where: { rut: id }})
//    .then(num => {
//       res.send(num ? { message: "User eliminado" } : { message: `User no encontrado`});
//        
//    })
//    .catch(err => {
//        res.status(500).send({ message: "Error al eliminar usuario"});
//    });
//};
//
//// eliminar a todos los usuarios
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

export { create, findAll, findOne };