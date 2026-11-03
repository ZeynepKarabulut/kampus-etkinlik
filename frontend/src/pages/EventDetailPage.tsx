import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { events, deleteEvent } = useEvents();
  const navigate = useNavigate();

  // ID'ye göre ilgili etkinliği buluyoruz
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="container" style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Etkinlik Bulunamadı</h2>
        <p style={{ margin: '20px 0' }}>Aradığınız etkinlik silinmiş veya mevcut değil.</p>
        <Link to="/events" style={{ color: '#3498db', fontWeight: 'bold' }}>Etkinliklere Geri Dön</Link>
      </div>
    );
  }

  function handleDelete() {
    if (!event) return; // Eğer event yoksa işlem yapma
    if (window.confirm('Bu etkinliği silmek istediğinize emin misiniz?')) {
      deleteEvent(event.id);
      navigate('/events');
    }
  }

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/events" style={{ color: '#3498db', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>
        &larr; Tüm Etkinliklere Dön
      </Link>

      <div style={{ background: '#fff', border: '1px solid #ddd', padding: '30px', borderRadius: '8px' }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>{event.title}</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px', background: '#f9f9f9', padding: '15px', borderRadius: '6px' }}>
          <p><strong>Kategori:</strong> {event.category}</p>
          <p><strong>Tarih ve Saat:</strong> {event.date}, {event.time}</p>
          <p><strong>Yer:</strong> {event.location}</p>
          <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
        </div>

        <h4 style={{ marginBottom: '10px' }}>Etkinlik Açıklaması</h4>
        <p style={{ lineHeight: '1.6', color: '#444', marginBottom: '30px' }}>{event.description}</p>

        {/* Yönetim İşlemleri (Düzenle ve Sil) */}
        <div style={{ display: 'flex', gap: '15px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <Link 
            to={`/admin/${event.id}/edit`} 
            style={{ padding: '8px 16px', background: '#f39c12', color: '#fff', borderRadius: '4px', textDecoration: 'none', fontWeight: '500' }}
          >
            Düzenle
          </Link>
          <button 
            onClick={handleDelete}
            style={{ padding: '8px 16px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}