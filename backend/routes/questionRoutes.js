import { Router } from "express";
import {
  generateGeneralQuestions,
  generatePlanController,
  generateQuestions,
} from "../controllers/questionController.js";
const router = Router();

router.post("/generate-mcq-questions", generateQuestions);
router.post("/generate-general-questions", generateGeneralQuestions);
router.post("/generate-plan", generatePlanController);

export default router;
