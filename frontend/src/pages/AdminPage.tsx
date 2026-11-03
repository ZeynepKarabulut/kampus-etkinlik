import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';

export default function AdminPage() {
  const { events, deleteEvent } = useEvents();

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`"${title}" etkinliğini silmek istediğinizden emin misiniz?`)) {
      deleteEvent(id);
    }
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '16px' }}>
        <Link to="/admin/new" className="btn">+ Yeni etkinlik</Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Etkinlik</th>
            <th>Tarih</th>
            <th>Kategori</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td data-baslik="Etkinlik">{event.title}</td>
              <td data-baslik="Tarih">{event.date}</td>
              <td data-baslik="Kategori">{event.category}</td>
              <td data-baslik="İşlemler" className="islemler">
                <Link to={`/admin/${event.id}/edit`} className="btn btn-edit">Düzenle</Link>
                <button 
                  type="button" 
                  className="btn btn-delete" 
                  onClick={() => handleDelete(event.id, event.title)}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}