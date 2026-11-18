import dotenv from "dotenv/config";
import mongoose from "mongoose";
import Event from "./models/event-model.js";
import {seedEvents} from "./data/events.js"

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Event.deleteMany({});
    const data = await Event.insertMany(seedEvents);
    console.log("Test verileri MongoDB Atlas veritabanına başarıyla eklendi! " + data.length);
  } catch (err) {
    console.log("Seed hatası:", err);
  } finally {
    process.exit();
  }
};

seedDB();