import express from "express";
import ctrlEvents from "../controllers/event-controller.js";

var router = express.Router();


router
  .get("/events",ctrlEvents.listEvents)
  .post("/events", ctrlEvents.addEvent)
  .get("/events/:id", ctrlEvents.getEvent)

export default router;