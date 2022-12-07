import mongoose from "mongoose";

const Schema = mongoose.Schema;
const CarbonSchema = new Schema({
  country: { type: String, required: true },
  year: { type: Number, required: true },
  value: { type: Number, required: true }
});

export const Carbon = mongoose.model("carbon", CarbonSchema, "carbon");