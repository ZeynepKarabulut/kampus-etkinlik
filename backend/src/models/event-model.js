import mongoose from "mongoose";

var eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String },
  category: { type: String, required: true },
  capacity: { type: Number, required: true }
});

export default mongoose.model("Event", eventSchema, "events");