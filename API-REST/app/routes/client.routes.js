//module.exports = app => 
//{
//    const client = require("../controllers/client.controller.js");
//    var router   = require("express").Router();
//
//    router.post("/add", client.create);                     // Create client
//    router.get("/all", client.findAll);                     // Search clients(with filter)
//    router.get("/one/:id_user", client.findOne);                // Search client by fk
//    //router.put("/:id_client", client.update);               // Update client
//    //router.delete("/:id_client", client.delete);            // Delete client by id
//    //router.delete("/", client.deleteAll);                   // Drop clients
//    
//    app.use('/client', router);
//};

import { Router } from "express";
import { create, findAll, findOne } from "../controllers/client.controller.js";

const router = Router();

router.post("/add",         create);                 // Create client
router.get("/all",          findAll);                // Search clients(with filter)
router.get("/find-by-uid/:id_user", findOne);                // Search client by fk
//router.put("/:id_client", client.update);               // Update client
//router.delete("/:id_client", client.delete);            // Delete client by id
//router.delete("/", client.deleteAll);                   // Drop clients


export default router;