import Admin from "../models/admin.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      res.status(400);
      throw new Error("Admin already exists");
    }
    const admin = await Admin.create({
      email,
      password,
    });
    if (admin) {
      res.status(201).json({
        _id: admin._id,
        email: admin.email,
        token: jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        }),
      });
    } else {
      res.status(400);
      throw new Error("Invalid admin data");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" || error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        email: admin.email,
        token: jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        }),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};