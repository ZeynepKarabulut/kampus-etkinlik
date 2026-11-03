import { useState, useEffect } from 'react';
import { useEvents } from '../context/EventsContext';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { validateEvent } from '../utils/validate-event';

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Seminer',
    date: '',
    time: '',
    location: '',
    capacity: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sayfa yüklendiğinde ilgili etkinliğin verilerini form alanlarına dolduruyoruz
  useEffect(() => {
    const eventToEdit = events.find((e) => e.id === id);
    if (eventToEdit) {
      setFormData({
        title: eventToEdit.title,
        category: eventToEdit.category,
        date: eventToEdit.date,
        time: eventToEdit.time,
        location: eventToEdit.location,
        capacity: String(eventToEdit.capacity),
        description: eventToEdit.description,
      });
    }
  }, [id, events]);

  function handleSubmit(e: any) {
    e.preventDefault();
    
    const validationErrors = validateEvent(formData);
    setErrors(validationErrors as any);

    if (Object.keys(validationErrors).length === 0 && id) {
      updateEvent(id, formData);
      navigate('/admin');
    }
  }

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Link to="/admin" style={{ color: '#3498db', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>
        &larr; Yönetim Paneline Dön
      </Link>

      <div style={{ background: '#fff', border: '1px solid #ddd', padding: '30px', borderRadius: '8px' }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Etkinliği Düzenle</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Etkinlik Adı</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {errors.title && <span style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.title}</span>}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Kategori</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="Seminer">Seminer</option>
              <option value="Atölye">Atölye</option>
              <option value="Söyleşi">Söyleşi</option>
              <option value="Yarışma">Yarışma</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Tarih</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              {errors.date && <span style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.date}</span>}
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Saat</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              {errors.time && <span style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.time}</span>}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Yer</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {errors.location && <span style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.location}</span>}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Kontenjan</label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {errors.capacity && <span style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.capacity}</span>}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Açıklama</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {errors.description && <span style={{ fontSize: '12px', color: '#e74c3c' }}>{errors.description}</span>}
          </div>

          <button
            type="submit"
            style={{ padding: '12px', background: '#f39c12', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
          >
            Değişiklikleri Kaydet
          </button>
        </form>
      </div>
    </div>
  );
}