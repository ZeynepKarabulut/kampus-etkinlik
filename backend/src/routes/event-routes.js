import { Router } from "express";
import { 
    listEvents, 
    getUpcomingEvents, 
    getEvent, 
    addEvent, 
    updateEvent, 
    deleteEvent 
} from "../controllers/event-controller.js";

const router = Router();

router.get("/", listEvents);
router.get("/upcoming", getUpcomingEvents); 
router.get("/:id", getEvent);
router.post("/", addEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;