import { useState, useEffect } from "react";
import { events } from "./data/events";
import type { Category, CampusEvent } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import "./App.css";

type PageName = "home" | "events" | "detail" | "add" | "update";

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

  function renderCard(event: CampusEvent) {
    const tarihFormatted = new Date(event.date).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p className="kategori-etiket">{event.category}</p>
        <p><strong>Tarih:</strong> {tarihFormatted}, {event.time}</p>
        <p><strong>Yer:</strong> {event.location}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
        <p className="aciklama">{event.description}</p>
        <button
          className="detay-link"
          onClick={() => go("detail", event.id)}
        >
          Detayları gör
        </button>
      </article>
    );
  }

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
      <header className="site-baslik">
        <h1>Kampüs Etkinlikleri</h1>
      </header>

      <nav className="menu">
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); go("home"); }}
          aria-current={page === "home" ? "page" : undefined}
        >
          Ana Sayfa
        </a>{" "}
        &middot;{" "}
        <a
          href="#events"
          onClick={(e) => { e.preventDefault(); go("events"); }}
          aria-current={page === "events" ? "page" : undefined}
        >
          Etkinlikler
        </a>{" "}
        &middot;{" "}
        <a
          href="#add"
          onClick={(e) => { e.preventDefault(); go("add"); }}
          aria-current={page === "add" ? "page" : undefined}
        >
          Ekle
        </a>
      </nav>

      <main>
        {page === "home" && (
          <>
            <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-listesi">{upcoming.map(renderCard)}</section>
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
            <p>Ekim ayında kampüste düzenlenen etkinlikler.</p>
            
            <div className="filtreler">
              <input
                type="search"
                id="arama"
                placeholder="Örn. atölye, kariyer"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <select
                id="kategori-filtre"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category | "")}
              >
                <option value="">Tümü</option>
                <option value="Seminer">Seminer</option>
                <option value="Atölye">Atölye</option>
                <option value="Söyleşi">Söyleşi</option>
                <option value="Yarışma">Yarışma</option>
              </select>
            </div>

            <p id="sonuc">
              {filteredEvents.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filteredEvents.length} etkinlik listeleniyor.`}
            </p>
            <section className="etkinlik-listesi">
              {filteredEvents.map(renderCard)}
            </section>
          </>
        )}

        {page === "detail" && selectedEvent && (
          <article className="detay">
            <h2>{selectedEvent.title}</h2>
            {selectedEvent.image && (
              <figure style={{ margin: "1rem 0" }}>
                <img src={selectedEvent.image} alt={`${selectedEvent.title} afişi`} style={{ width: "100%", borderRadius: "8px" }} />
              </figure>
            )}
            <div className="kunye">
              <h3>Etkinlik Künyesi</h3>
              <p><strong>Tarih:</strong> {selectedEvent.date}, {selectedEvent.time}</p>
              <p><strong>Yer:</strong> {selectedEvent.location}</p>
              <p><strong>Kategori:</strong> {selectedEvent.category}</p>
              <p><strong>Kontenjan:</strong> {selectedEvent.capacity} kişi</p>
            </div>
            <p className="aciklama" style={{ marginTop: "1rem" }}>{selectedEvent.description}</p>
            
            <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
              <button className="btn" onClick={() => go("events")}>Listeye dön</button>
              <button className="btn" onClick={() => go("update", selectedEvent.id)}>Bu etkinliği güncelle</button>
            </div>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <p style={{ fontSize: "0.85rem", color: "#666" }}>
              Bu sprintte form sadece görünüm; kayıt yapılmaz.
            </p>

            <label htmlFor="title">Etkinlik Adı *</label>
            <input id="title" maxLength={80} placeholder="Örn. Kariyer Günleri 2026" />

            <label htmlFor="category">Kategori *</label>
            <select id="category">
              <option value="">Seçiniz</option>
              <option value="Seminer">Seminer</option>
              <option value="Atölye">Atölye</option>
              <option value="Söyleşi">Söyleşi</option>
              <option value="Yarışma">Yarışma</option>
            </select>

            <label htmlFor="date">Tarih *</label>
            <input type="date" id="date" />

            <label htmlFor="time">Saat *</label>
            <input type="time" id="time" />

            <label htmlFor="location">Yer *</label>
            <input id="location" placeholder="Örn. A Blok Konferans Salonu" />

            <label htmlFor="capacity">Kontenjan</label>
            <input type="number" id="capacity" />

            <label htmlFor="description">Açıklama</label>
            <textarea id="description" rows={5} />

            <button type="submit" className="btn">Kaydet</button>
          </form>
        )}
      </main>
    </>
  );
}