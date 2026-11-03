import { Link } from 'react-router-dom';
import type { CampusEvent } from '../../types/campus-event';

interface EventDetailProps {
  event: CampusEvent;
}

export default function EventDetail({ event }: EventDetailProps) {
  return (
    <div>
      <div style={{ marginBottom: '15px' }}>
        <Link to="/events" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>
          ← Tüm Etkinliklere Dön
        </Link>
      </div>

      <div className="card" style={{ maxWidth: '800px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#1e293b' }}>{event.title}</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px', fontSize: '14px' }}>
          <div>
            <p style={{ color: '#64748b', marginBottom: '4px' }}>Kategori</p>
            <p style={{ fontWeight: '600', color: '#334155' }}>{event.category}</p>
          </div>
          <div>
            <p style={{ color: '#64748b', marginBottom: '4px' }}>Tarih ve Saat</p>
            <p style={{ fontWeight: '600', color: '#334155' }}>{event.date}</p>
          </div>
          <div>
            <p style={{ color: '#64748b', marginBottom: '4px' }}>Yer</p>
            <p style={{ fontWeight: '600', color: '#334155' }}>{event.location}</p>
          </div>
          <div>
            <p style={{ color: '#64748b', marginBottom: '4px' }}>Kontenjan</p>
            <p style={{ fontWeight: '600', color: '#334155' }}>{event.capacity} kişi</p>
          </div>
        </div>

        <div style={{ marginBottom: '24px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
          <p style={{ color: '#64748b', marginBottom: '6px', fontSize: '14px' }}>Etkinlik Açıklaması</p>
          <p style={{ color: '#334155', fontSize: '15px' }}>{event.description}</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
          <Link to={`/admin/${event.id}/edit`} className="btn btn-edit" style={{ background: '#d97706', padding: '8px 16px', borderRadius: '4px', color: '#fff', textDecoration: 'none', fontWeight: '500' }}>
            Düzenle
          </Link>
          <Link to="/admin" className="btn btn-delete" style={{ background: '#dc2626', padding: '8px 16px', borderRadius: '4px', color: '#fff', textDecoration: 'none', fontWeight: '500' }}>
            Sil
          </Link>
        </div>
      </div>
    </div>
  );
}