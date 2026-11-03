import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';

export default function AdminPage() {
  const { events, deleteEvent } = useEvents();

  return (
    <div className="container" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Yönetim Paneli - Etkinlik Yönetimi</h2>
        <Link 
          to="/admin/new" 
          style={{ padding: '10px 20px', background: '#27ae60', color: '#fff', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}
        >
          + Yeni Etkinlik Ekle
        </Link>
      </div>

      <p style={{ color: '#666', marginBottom: '20px' }}>Mevcut etkinlikleri düzenleyebilir veya silebilirsiniz.</p>

      <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f4f4f4', borderBottom: '1px solid #ddd' }}>
              <th style={{ padding: '12px' }}>Etkinlik Adı</th>
              <th style={{ padding: '12px' }}>Kategori</th>
              <th style={{ padding: '12px' }}>Tarih</th>
              <th style={{ padding: '12px' }}>Yer</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px', fontWeight: '500' }}>{event.title}</td>
                <td style={{ padding: '12px' }}>{event.category}</td>
                <td style={{ padding: '12px' }}>{event.date}</td>
                <td style={{ padding: '12px' }}>{event.location}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <Link 
                    to={`/admin/${event.id}/edit`} 
                    style={{ marginRight: '10px', color: '#f39c12', textDecoration: 'none', fontWeight: 'bold' }}
                  >
                    Düzenle
                  </Link>
                  <button 
                    onClick={() => {
                      if (window.confirm('Bu etkinliği silmek istediğinize emin misiniz?')) {
                        deleteEvent(event.id);
                      }
                    }}
                    style={{ background: 'transparent', color: '#e74c3c', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}