import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = email.includes('@');
    if (!found) {
      setError('Geçerli bir e-posta girin.');
      setSent('');
    } else {
      setError('');
      setSent(`Bağlantı ${email} adresine gönderildi (demo).`);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Şifremi Unuttum</h1>
        <p>Şifrenizi sıfırlamak için e-posta adresinizi girin.</p>
      </header>

      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>E-posta Adresi</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@ogrenci.edu.tr" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
            {error && <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '4px' }}>{error}</p>}
          </div>

          <button type="submit" style={{ width: '100%', padding: '10px' }}>Şifre Sıfırlama Bağlantısı Gönder</button>
        </form>

        {sent && (
          <p className="mesaj-basari" style={{ marginTop: '15px', padding: '10px', background: '#ecfdf5', color: '#065f46', borderRadius: '4px', fontSize: '14px' }}>
            {sent}
          </p>
        )}

        <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
          <Link to="/login" style={{ color: '#65a30d', textDecoration: 'none' }}>Girişe dön</Link>
        </div>
      </div>
    </div>
  );
}