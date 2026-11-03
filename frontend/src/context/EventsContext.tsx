import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CampusEvent, EventFormData } from '../types/campus-event';
import { events as initialEvents } from '../data/events';

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  // Yeni etkinlik ekleme
  function addEvent(data: EventFormData) {
    const newEvent: CampusEvent = {
      id: `event-${Date.now()}`,
      title: data.title.trim(),
      category: data.category as any,
      date: data.date,
      time: data.time,
      location: data.location,
      capacity: Number(data.capacity),
      description: data.description,
    };
    setEvents((prev) => [...prev, newEvent]);
  }

  // Etkinlik güncelleme
  function updateEvent(id: string, data: EventFormData) {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              title: data.title.trim(),
              category: data.category as any,
              date: data.date,
              time: data.time,
              location: data.location,
              capacity: Number(data.capacity),
              description: data.description,
            }
          : e
      )
    );
  }

  // Etkinlik silme
  function deleteEvent(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const value = useContext(EventsContext);
  if (!value) {
    throw new Error('EventsProvider bulunamadı!');
  }
  return value;
}