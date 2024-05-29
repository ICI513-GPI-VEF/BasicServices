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
    if (!req.body.comment || !req.body.qualification || !req.body.id_client || !req.body.id_experience) {
        res.status(400).send({ status: 400, message: "Each parameter of the body must not be empty!" });
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
        res.status(201).send({ status: 201, message: "Created opinion", data: data });
    })
    .catch(err => {     // error 500: 
        res.status(500).send({ status: 500, message: err.message || "Error creating a opinion"});
    });
};

// Return all opinios about provider
const findAllByProvider = (req, res) =>
{
    const id_provider = req.params.id_provider;
    var condition     = { id_provider: {[Op.eq]: id_provider} };

    Experience.findAll({
        attributes: { exclude: ["updatedAt", "createdAt", "name_work", "description", "horary", "id_experience", "id_provider"]},
        where: condition,
        include: [{
            model: db.opinion,
            as: 'experienceOpinions',
            attributes: { exclude: ["createdAt", "updatedAt", "id_opinion", "id_client", "id_experience"] }
        }]
    })
    .then(data => {
        if (data.length) res.status(200).send({ status: 200, message: "Opinions found", data: data }); // Does the data exist? deliver the data
        else             res.status(404).send({ status: 404, message: "Opinions not found" });
    })
    .catch(err => {
        res.status(500).send({ status: 500, message: err.message || "Search opinions error"});
    });
};

export { create, findAllByProvider };