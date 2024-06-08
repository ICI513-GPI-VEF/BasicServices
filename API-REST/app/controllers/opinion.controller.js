// Import dependencies

import db from "../models/index.js"
//const db       = require("../models");
const Opinion    = db.opinion;
const Experience = db.experience;
const Op         = db.Sequelize.Op;

// Create a opinion
const create = (req, res) => 
{
// Validate query
    const dataRequired = () => { return req.body.comment && req.body.qualification && req.body.id_client && req.body.id_experience; };
    if (!dataRequired()) {
        res.status(400).send({ okey: false, status: 400, message: "Each parameter of the body must not be empty!", data: {} });
        return;
    }

// Create a opinion
    const opinion = {
        comment:        req.body.comment,
        qualification:  req.body.qualification,
        id_client:      req.body.id_client,
        id_experience:  req.body.id_experience
    };

// Store in database
    Opinion.create(opinion) // Okay? then return the data
    .then(data => {
        res.status(201).send({ okey: true, status: 201, message: "Created opinion", data: data });
    })
    .catch(err => {     // error 500: 
        res.status(500).send({ okey: false, status: 500, message: err.message + ". Error creating a opinion", data: {} });
    });
};

// Return all opinios about provider
const findAllByProvider = (req, res) =>
{
    const id_provider = req.params.id_provider;
    var condition     = { [Op.and]: [ {id_provider: {[Op.eq]: id_provider}} ]};//, { avg_qualification: {[Op.gt]: 0} } ]};

    Experience.findAll({
        attributes: { exclude: ["updatedAt", "createdAt", "description", "horary", "id_experience", "id_provider"]},
        where: condition,
        include: [{
            model: db.opinion,
            as: 'experienceOpinions',
            attributes: { exclude: ["createdAt", "updatedAt", "id_opinion", "id_client", "id_experience"] }
        }]
    })
    .then(data => {
        const thereOpinions = () => { return data.length; };

        if (thereOpinions())  res.status(200).send({ okey: true,  status: 200, message: "Opinions found",     data: data }); // Does the data exist? deliver the data
        else                  res.status(404).send({ okey: false, status: 404, message: "Opinions not found", data: data });
    })
    .catch(err => {
        res.status(500).send({ okey: false, status: 500, message: err.message + ". Search opinions error", data: []});
    });
};

export { create, findAllByProvider };