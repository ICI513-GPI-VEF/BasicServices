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
import { create, findAll, findOne } from "../controllers/user.controller.js";

const router = Router();

router.post("/add", create);       // Create a user
router.get("/all", findAll);       // Search users(with filter)
router.get("/one", findOne);       // Search user by alias and password

//router.put("/:rut", user.update);       // Update client
//router.delete("/:rut", user.delete);    // Delete user by id
//router.delete("/", user.deleteAll);     // Drop users

export default router;