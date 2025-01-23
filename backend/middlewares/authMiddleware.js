import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

export const adminMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;

    Admin.findById(req.admin._id)
      .then((admin) => {
        if (!admin || !admin.isAdmin) {
          return res.status(403).send({ error: "Access denied. Admins only." });
        }
        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Internal server error." });
      });
  } catch (ex) {
    res.status(400).send({ error: "Invalid token." });
  }
};
