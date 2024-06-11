//module.exports = app => 
//{
//    const provider = require("../controllers/provider.controller.js");
//    var router     = require("express").Router();
//
//    router.post("/add", provider.create);             // Create a provider
//    router.get("/all", provider.findAll);             // Search providers(with filter)
//    router.get("/one/:id_user", provider.findOne);             // Search provider by fk
//    //router.put("/:id_prov", provider.update);       // Update provider
//    //router.delete("/:id_prov", provider.delete);    // Delete provider by id
//    //router.delete("/", provider.deleteAll);           // Drop providers
//    
//    app.use('/provider', router);
//};

import { Router } from "express";
import { create, findAll, findByClient } from "../controllers/provider.controller.js";

const router = Router();

router.post("/add",          create);             // Create a provider
router.get("/all",          findAll);             // Search providers(with filter)
router.get("/one-by-cid/:id_client", findByClient);             // Search provider by fk
//router.put("/:id_prov", provider.update);       // Update provider
//router.delete("/:id_prov", provider.delete);    // Delete provider by id
//router.delete("/", provider.deleteAll);           // Drop providers


export default router;