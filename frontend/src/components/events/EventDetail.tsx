import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

export default function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay">
      <h2>{event.title}</h2>
      {event.image && (
        <figure style={{ margin: "1rem 0" }}>
          <img src={event.image} alt={`${event.title} afişi`} style={{ width: "100%", borderRadius: "8px" }} />
        </figure>
      )}
      <div className="kunye">
        <h3>Etkinlik Künyesi</h3>
        <p><strong>Tarih:</strong> {formatDate(event.date)}, {event.time}</p>
        <p><strong>Yer:</strong> {event.location}</p>
        <p><strong>Kategori:</strong> {event.category}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      </div>
      <p className="aciklama" style={{ marginTop: "1rem" }}>{event.description}</p>
      
      <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
        <button className="btn" onClick={onBack}>Listeye dön</button>
        <button className="btn" onClick={() => onEdit(event.id)}>Bu etkinliği güncelle</button>
      </div>
    </article>
  );
}