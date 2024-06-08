//module.exports = app => 
//{
//    const user = require("../controllers/user.controller.js");
//    var router = require("express").Router();
//
//    router.post("/add", user.create);       // Create a user
//    router.get("/all", user.findAll);       // Search users(with filter)
//    router.get("/one", user.findOne);      // Search user by alias and password
//    //router.put("/:rut", user.update);       // Update client
//    //router.delete("/:rut", user.delete);    // Delete user by id
//    //router.delete("/", user.deleteAll);     // Drop users
//
//    // Add routes to server
//    app.use('/user', router);
//};

import { Router } from "express";
import { create, findAll, findOne, update, drop } from "../controllers/client.controller.js";

const router = Router();

router.post("/add",         create);       // Create a client
router.get("/all",         findAll);       // Search clients(with filter)
router.get("/one-by-auth", findOne);       // Search client by email and password
router.put("/:id",          update);       // Update client
router.delete("/:id",         drop);       // Delete client by id
//router.delete("/", user.deleteAll);      // Drop users

export default router;