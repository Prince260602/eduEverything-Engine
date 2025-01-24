import express from "express";
import bodyParser from "body-parser";
import questionsRoutes from "./routes/questionRoutes.js";
import engineRoutes from "./routes/engineRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import cors from "cors";
import connectDB from "./db.js";
import adminRoute from "./routes/adminRoute.js";

const app = express();

app.use(
  cors({
    origin: "https://edu-everything-engine.vercel.app",
  })
);

app.use(bodyParser.json());
connectDB();

app.use("/api/questions", questionsRoutes);
app.use("/api", engineRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/admin", adminRoute);

export default app;
