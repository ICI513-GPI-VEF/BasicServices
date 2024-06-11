import { Router } from "express";
import { create, findAll, findAllByExperience, drop } from "../controllers/opinion.controller.js";

const router = Router();

router.post("/add",                             create);     // Create a opinion
router.get("/all",                             findAll);    // Search opinions of some provider
router.get("/all-by-eid/:id_exp",  findAllByExperience);    // Search opinions of some provider
router.delete("/:id",                             drop);    // Drop opinion
//router.get("/all-by-pid/:id_provider", findAllByProvider);  // Search experiences by fk
//router.put("/:id_prov", provider.update);       // Update provider
//router.delete("/:id_prov", provider.delete);    // Delete provider by id


export default router;