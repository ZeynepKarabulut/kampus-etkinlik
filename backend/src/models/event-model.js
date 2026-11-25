import mongoose from "mongoose";
import { formatDate, parseDate } from "../utils/date.js";

var eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true, set: parseDate, get: formatDate },
    location: { type: String },
    category: { 
        type: String, 
        required: true,
        enum: ["Seminer", "Atölye", "Konferans", "Teknik Gezi"] // Projende kullanılan geçerli kategoriler
    },
    capacity: { type: Number, required: true }
}, {
    timestamps: true,
    toJSON: { getters: true },
    id: false
});

export default mongoose.model("Event", eventSchema, "events");