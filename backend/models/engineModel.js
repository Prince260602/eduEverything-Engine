import mongoose from "mongoose";

const engineSchema = new mongoose.Schema(
  {
    domain: { type: String, required: true, maxlength: 100 },
    subdomain: { type: [String], required: true, maxlength: 100 },
    imageURL: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Engine = mongoose.model("Engine", engineSchema);

export default Engine;
