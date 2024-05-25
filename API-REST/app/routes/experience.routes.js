import { Router } from "express";
import { create, findAll, findAllByProvider } from "../controllers/experience.controller.js";

const router = Router();

router.post("/add", create);     // Create a experience
router.get("/all",  findAll);    // Search experiences(with filter)
router.get("/all-by-pid/:id_provider", findAllByProvider);  // Search experiences by fk
//router.put("/:id_prov", provider.update);       // Update provider
//router.delete("/:id_prov", provider.delete);    // Delete provider by id
//router.delete("/", provider.deleteAll);           // Drop providers


export default router;