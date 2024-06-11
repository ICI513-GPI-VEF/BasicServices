// Import dependencies

import db from "../models/index.js";
import { updateExperience } from '../controllers/experience.controller.js';
//const db       = require("../models");
const Opinion    = db.opinion;
const Experience = db.experience;
const Op         = db.Sequelize.Op;

// Create a opinion
async function create(req, res)
{
// Validate query
    const dataRequired = () => { return req.body.qualification && req.body.id_client && req.body.id_experience; };
    if (!dataRequired()) {
        res.status(400).send({ okey: false, status: 400, message: "Each parameter of the body must not be empty!. ", data: {} });
        return;
    }

// Check if the client commented already the same experience
    const condition = { [Op.and]: [ { id_client: req.body.id_client }, { id_experience: req.body.id_experience } ]};
    const response  = await searchOne(condition);
    if (response.okey) { 
        res.status(409).send({ okey: false, status: 409, message: "Conlict: existing opinion. ", data: {} });
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
    .then(async (data) => 
    {
        const response = await getAvgQualifications(req.body.id_experience);
        if (!response.okey) {
            const resp = await dropOpinion(data.id_opinion); // Delete opinion
            res.status(response.status).send({ okey: response.okey, status: response.status, message: response.message + resp.message, data: resp.data }); 
            return;
        }
        const response2 = await updateExperience(req.body.id_experience, { avg_qualification: response.data });
        if (!response2.okey) {  
            const resp = await dropOpinion(data.id_opinion); // Delete opinion
            res.status(response2.status).send({ okey: response2.okey, status: response2.status, message: response2.message + resp.message, data: resp.data }); 
            return; 
        }
        res.status(201).send({ okey: true, status: 201, message: "Created opinion. " + response.message + response2.message, data: data});
    })
    .catch(err => {     // error 500: 
        res.status(500).send({ okey: false, status: 500, message: err.message + ". Error creating a opinion. ", data: {} });
    });
}

// Return all opinios about provider
/*const findAllByProvider = (req, res) =>
{
    const id_provider = req.params.id_provider;
    //var condition     = { [Op.and]: [ {id_provider: {[Op.eq]: id_provider}} ]};//, { avg_qualification: {[Op.gt]: 0} } ]};

    Experience.findAll({
        attributes: { exclude: ["updatedAt", "createdAt", "description", "horary", "id_experience", "id_provider"]},
        where: { id_provider: id_provider },
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
};*/

async function findAll(req, res)
{
    const {okey, status, message, data} = await searchAll(null);
    res.status(status).send({ okey, status, message, data });
}


async function findAllByExperience(req, res)
{   
    const condition = { id_experience: req.params.id_exp };
    const {okey, status, message, data} = await searchAll(condition);
    res.status(status).send({ okey, status, message, data });
}


// Search all by condition
async function searchAll(condition)
{
    var response;

    await Opinion.findAll({
        where:      condition,
        attributes: { exclude: ["createdAt"] }

    }).then(data => {
        response = { okey: true, status: 200, message: "Opinions found. ", data: data };
    })
    .catch(err => {
        response = { okey: false, status: 500, message: err.message + ". Search opinions error. ", data: [] };
    });

    return response;
}

// Search one by condition
async function searchOne(condition)
{
    var response;

    await Opinion.findOne({
        where:      condition,
        attributes: { exclude: ["id_experience", "updatedAt"] }

    }).then(data => {
        if (data)   response = { okey: true,  status: 200, message: "Opinion found. ",     data: data };
        else               response = { okey: false, status: 404, message: "Opinion not found. ", data: {}   };
    })
    .catch(err => {
        response = { okey: false, status: 500, message: err.message + ". Search opinion error. ", data: {} };
    });

    return response;
}

// Calculate average qualification of some experience
async function getAvgQualifications(id_experience)
{   
    const condition = { id_experience: id_experience };
    const response  = await searchAll(condition);

    if (response.okey)
    {
        const calculateAvg = () => {
            const data = response.data;
            const size = data.length;
            let sum    = 0;
            for (var i=0; i<size; i++)
                sum += data[i].qualification;

            return sum/size;
        };
        const avg = Math.round(calculateAvg());

        return { okey: true, status: 200, message: "Avg qualification done. ", data: avg };
    }
    else return { okey: response.okey, status: response.status, message: response.message + "Calculation of the average without effect. ", data: 0 };
}


// Delete a opinion by id
async function drop(req, res)
{
    const { okey, status, message, data } = await dropOpinion(req.params.id);
    res.status(status).send({ okey: okey, status: status, message: message, data: data });
}

async function dropOpinion(id)
{   
    var response;

    await Opinion.destroy({ where: { id_opinion: id } })
    .then(num => {
        if (num)    response = { okey: true,  status: 200, message: "Deleted opinion. ",             data: num };
        else        response = { okey: false, status: 404, message: "Opinion not found to delete. ", data: num };
    })
    .catch(err => {
        response = { okey: false, status: 500, message: err.message + ". Error when deleting opinion. ", data: 0 };
    });

    return response;
}


export { create, findAll, findAllByExperience, drop };