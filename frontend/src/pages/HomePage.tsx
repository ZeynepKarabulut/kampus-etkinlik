import { useEvents } from '../context/EventsContext';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { events } = useEvents();
  // Yaklaşan etkinliklerden ilk 2 tanesini ana sayfada gösteriyoruz
  const featuredEvents = events.slice(0, 2);

  return (
    <div className="container">


      <h3 style={{ margin: '20px 0' }}>Yaklaşan {featuredEvents.length} Etkinlik</h3>

      <div className="events-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {featuredEvents.map((event) => (
          <div key={event.id} className="event-card" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: '#fff' }}>
            <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>{event.title}</h4>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}><strong>Kategori:</strong> {event.category}</p>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}><strong>Tarih:</strong> {event.date}, {event.time}</p>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}><strong>Yer:</strong> {event.location}</p>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}><strong>Kontenjan:</strong> {event.capacity} kişi</p>
            <p style={{ fontSize: '13px', color: '#444', marginBottom: '15px' }}>{event.description}</p>
            <Link to={`/events/${event.id}`} style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>
              Detayları gör
            </Link>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <Link to="/events" className="btn-primary" style={{ padding: '10px 20px', background: '#27ae60', color: '#fff', borderRadius: '5px', textDecoration: 'none' }}>
          Tüm etkinlikleri gör
        </Link>
      </div>
    </div>
  );
}