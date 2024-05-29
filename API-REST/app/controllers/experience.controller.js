// Import dependencies

import db from "../models/index.js"
//const db       = require("../models");
const Experience = db.experience;
const Op         = db.Sequelize.Op;

// Create a experience
const create = (req, res) => 
{
    // Validate query
    if (!req.body.name_work || !req.body.description || !req.body.horary || !req.body.id_provider) {
        res.status(400).send({ status: 400, message: "Each parameter of the body must not be empty!" });
        return;
    }
    // Create a experience
    const experience = {
        name_work:    req.body.name_work,
        description:  req.body.description,
        horary:       req.body.horary,
        id_provider:  req.body.id_provider
    };

    // Store in database
    Experience.create(experience) // Okay? then return the data
    .then(data => {
        res.status(201).send({ status: 201, message: "Created experience", data: data });
    })
    .catch(err => {     // error 500: 
        res.status(500).send({ status: 500, message: err.message || "Error creating a experience"});
    });
};

// Return the providers with some work experience from the database
const findAll = (req, res) =>
{
    const {work}  = req.query; //...../all?work=ja
    var condition = (work)? {  name_work: {[Op.like]: `%${work}%`}  } : null;

    Experience.findAll({
        attributes: { exclude: ["id_provider", "id_experience", "createdAt", "updatedAt"] },
        where: condition,
        include: [{
            model: db.provider,
            as: 'experienceProvider',
            attributes: { exclude: ["overview", "id_provider", "id_user", "updatedAt"] },
            include: [{
                model: db.user,
                as: 'providerUser',
                attributes: { exclude: ["address", "alias", "password", "id_user", "createdAt", "updatedAt"] }
            }]
        }]
    })
    .then(data => {
        if (data.length) res.status(200).send({ status: 200, message: "Providers with '" + work + "' experience found",        data: data });
        else             res.status(200).send({ status: 200, message: "There are no providers with '" + work + "' experience", data: []   });
    })
    .catch(err => {
        res.status(500).send({ status: 500, message: err.message || "Search providers with '" + work + "' experience error"});
    });
};

const findAllByProvider = (req, res) =>
{
    const id_provider = req.params.id_provider;
    var condition = { id_provider: {[Op.eq]: id_provider} };

    Experience.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "id_provider"]}, // "id_experience"]},
        where: condition
    })
    .then(data => {
        if (data.length) res.status(200).send({ status: 200, message: "Experiences found", data: data }); // Does the data exist? deliver the data
        else             res.status(404).send({ status: 404, message: "Experiences not found" });
    })
    .catch(err => {
        res.status(500).send({ status: 500, message: err.message || "Search experiences error"});
    });
}


export { create, findAll, findAllByProvider };