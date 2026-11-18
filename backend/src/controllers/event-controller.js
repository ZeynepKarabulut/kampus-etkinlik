import Event from "../models/event-model.js";

const createResponse = function (res, status, content) {
  res.status(status).json(content);
};
export const listEvents = async (req, res) => {
    try {
        const events = await Event.find();
        console.log("Veritabanından gelen etkinlikler:", events); // <-- Bu satırı ekle
        
        if (!events || events.length === 0) {
            return res.status(404).json({ status: "Böyle bir etkinlik yok" });
        }
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Yeni etkinlik ekleme (POST)
const addEvent = async function (req, res) {
  try {
    const newEvent = await Event.create(req.body);
    createResponse(res, 201, newEvent);
  } catch (error) {
    createResponse(res, 400, error);
  }
};

// Belirli bir etkinliği getirme (GET /:id)
const getEvent = async function (req, res) {
  try {
    const event = await Event.findById(req.params.id).exec();
    if (!event) {
      createResponse(res, 404, { status: "Böyle bir etkinlik yok" });
      return;
    }
    createResponse(res, 200, event);
  } catch (error) {
    createResponse(res, 404, { status: "Böyle bir etkinlik yok" });
  }
};

// Belirli bir etkinliği güncelleme (PUT /:id)
const updateEvent = async function (req, res) {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvent) {
      createResponse(res, 404, { status: "Böyle bir etkinlik yok" });
      return;
    }
    createResponse(res, 200, updatedEvent);
  } catch (error) {
    createResponse(res, 400, error);
  }
};

// Belirli bir etkinliği silme (DELETE /:id)
const deleteEvent = async function (req, res) {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      createResponse(res, 404, { status: "Böyle bir etkinlik yok" });
      return;
    }
    createResponse(res, 200, { status: deletedEvent.title + " isimli etkinlik silindi" });
  } catch (error) {
    createResponse(res, 404, { status: "Böyle bir etkinlik yok" });
  }
};

export default {
  listEvents,
  addEvent,
  getEvent,
  updateEvent,
  deleteEvent
};
