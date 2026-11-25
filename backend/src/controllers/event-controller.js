import Event from "../models/event-model.js";
import mongoose from "mongoose";
import { todayStart } from "../utils/date.js";

function notFound(res) {
    return res.status(404).json({ error: { message: "Event not found" } });
}

const KORUNAN_ALANLAR = ["_id", "createdAt", "updatedAt", "__v"];

// Tüm etkinlikleri listele ve filtrele (GET /events)
export async function listEvents(req, res, next) {
    try {
        const { category, search } = req.query;
        const filter = {};
        if (category) filter.category = category;
        if (search) {
            const guvenli = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            filter.title = { $regex: guvenli, $options: "i" };
        }
        const events = await Event.find(filter).sort({ date: 1 });
        res.json(events);
    } catch (err) {
        next(err);
    }
}

// Yaklaşan etkinlikler (GET /events/upcoming)
export async function getUpcomingEvents(req, res, next) {
    try {
        const events = await Event.find({ 
            date: { $gte: todayStart() } 
        }).sort({ date: 1 });
        res.json(events);
    } catch (err) {
        next(err);
    }
}

// Yeni etkinlik ekle (POST /events)
export async function addEvent(req, res, next) {
    try {
        const newEvent = await Event.create(req.body);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ error: { message: error.message } });
    }
}

// Tekil etkinlik getir (GET /events/:id)
export async function getEvent(req, res, next) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
        const event = await Event.findById(req.params.id).exec();
        if (!event) return notFound(res);
        res.json(event);
    } catch (error) {
        next(error);
    }
}

// Etkinlik güncelle (PATCH /events/:id)
export async function updateEvent(req, res, next) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
        const body = req.body ?? {};
        if (Object.keys(body).length === 0) {
            return res.status(400).json({ error: { message: "Body is empty" } });
        }
        const korunan = Object.keys(body).filter((k) => KORUNAN_ALANLAR.includes(k));
        if (korunan.length > 0) {
            return res.status(400).json({ error: { message: `${korunan.join(", ")} cannot be changed` } });
        }
        const event = await Event.findByIdAndUpdate(req.params.id, body, {
            returnDocument: "after",
            runValidators: true,
        });
        if (!event) return notFound(res);
        res.json(event);
    } catch (err) {
        if (err.name === "ValidationError" || err.name === "CastError") {
            return res.status(400).json({ error: { message: err.message } });
        }
        next(err);
    }
}

// Etkinlik sil (DELETE /events/:id)
export async function deleteEvent(req, res, next) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return notFound(res);
        res.status(204).send();
    } catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({ error: { message: err.message } });
        }
        next(err);
    }
}
