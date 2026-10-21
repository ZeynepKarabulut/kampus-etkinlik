import { useState, useEffect } from "react";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";

import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

import "./App.css";

export default function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  function go(nextPage: PageName, id: string | null = null) {
    setPage(nextPage);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    if (page === "home") document.title = "Kampüs Etkinlikleri - Ana Sayfa";
    else if (page === "events") document.title = "Kampüs Etkinlikleri - Tüm Etkinlikler";
    else if (page === "add") document.title = "Kampüs Etkinlikleri - Yeni Etkinlik Ekle";
    else if (page === "update") document.title = "Kampüs Etkinlikleri - Etkinlik Güncelle";
    else if (page === "detail") {
      const ev = selectedId ? findEventById(events, selectedId) : undefined;
      document.title = ev ? `Kampüs Etkinlikleri - ${ev.title}` : "Etkinlik Detayı";
    }
  }, [page, selectedId]);

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    selectedCategory
  );

  const selectedEvent = selectedId ? findEventById(events, selectedId) : undefined;

  return (
    <>
      <Header
        title="Kampüs Etkinlikleri"
        text={
          page === "home"
            ? "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
            : page === "events"
            ? "Ekim ayında kampüste düzenlenen etkinlikler."
            : undefined
        }
      />

      <Navigation current={page} onNavigate={(p) => go(p)} />

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList
              events={upcoming}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Yaklaşan etkinlik bulunmuyor."
            />
            <p>
              <button className="btn" onClick={() => go("events")}>
                Tüm etkinlikleri gör
              </button>
            </p>
          </>
        )}

        {page === "events" && (
          <>
            <h2>Tüm Etkinlikler</h2>
            <EventFilter
              searchText={searchText}
              category={selectedCategory}
              onSearchChange={setSearchText}
              onCategoryChange={setSelectedCategory}
            />
            <EventList
              events={filteredEvents}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
          </>
        )}

        {page === "detail" && selectedEvent && (
          <EventDetail
            event={selectedEvent}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {page === "add" && (
          <EventForm title="Etkinlik Ekle" onSubmit={() => window.scrollTo(0, 0)} />
        )}

        {page === "update" && (
          <EventForm title="Etkinlik Güncelle" onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>

      <Footer />
    </>
  );
}