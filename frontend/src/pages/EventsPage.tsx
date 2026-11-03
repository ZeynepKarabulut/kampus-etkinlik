import { useState } from 'react';
import { useEvents } from '../context/EventsContext';
import { Link } from 'react-router-dom';

export default function EventsPage() {
  const { events } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');

  // Arama ve kategori filtreleme mantığı
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tümü' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container" style={{ padding: '20px' }}>
      
      {/* Filtreleme ve Arama Alanı */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', background: '#f9f9f9', padding: '15px', borderRadius: '8px', border: '1px solid #ddd' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Etkinlik ara</label>
          <input
            type="text"
            placeholder="Örn. atölye, kariyer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ width: '250px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Kategori</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="Tümü">Tümü</option>
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
            <option value="Söyleşi">Söyleşi</option>
            <option value="Yarışma">Yarışma</option>
          </select>
        </div>
      </div>

      <p style={{ marginBottom: '15px', fontWeight: '500' }}>{filteredEvents.length} etkinlik listeleniyor.</p>

      {/* Etkinlik Listesi Grid Yapısı */}
      <div className="events-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {filteredEvents.map((event) => (
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
    </div>
  );
}