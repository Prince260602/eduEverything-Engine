import express from "express";
import {
  sendContactMessage,
  getAllContacts,
} from "../controllers/contactController.js";

const router = express.Router();

// POST /api/contacts - Send a message
router.post("/", sendContactMessage);

// GET /api/contacts - Retrieve all contact messages
router.get("/", getAllContacts);

export default router;
