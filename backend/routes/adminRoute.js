import express from "express";
import { login, register } from "../controllers/adminController.js";
import { adminMiddleware } from "../middlewares/authMiddleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/refresh-token", adminMiddleware, (req, res) => {
  const token = jwt.sign({ _id: req.admin._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.json({ token });
});

router.get("/admin", adminMiddleware, (req, res) => {
  res.json({ message: "Admin authenticated" });
});

export default router;