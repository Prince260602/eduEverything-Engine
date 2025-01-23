import {
  getAllEngines,
  createEngine,
  deleteEngine,
  updateEngine,
} from "../controllers/engineController.js";

import { Router } from "express";
const router = Router();

router.post("/engine", createEngine);

router.get("/engine", getAllEngines);

router.put("/engine/:id", updateEngine);

router.delete("/engine/:id", deleteEngine);

export default router;
