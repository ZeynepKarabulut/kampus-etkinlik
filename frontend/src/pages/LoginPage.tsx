import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [sent, setSent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};
    if (!email.includes('@')) found.email = 'Geçerli bir e-posta girin.';
    if (password.length < 6) found.password = 'Şifre en az 6 karakter olmalıdır.';
    setErrors(found);
    if (Object.keys(found).length === 0) {
      setSent('Gerçek giriş Sprint 10\'da');
    } else {
      setSent('');
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>E-posta</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@ogrenci.edu.tr" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
            {errors.email && <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '4px' }}>{errors.email}</p>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Şifre</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
            {errors.password && <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '4px' }}>{errors.password}</p>}
          </div>

          <button type="submit" style={{ width: '100%', padding: '10px' }}>Giriş yap</button>
        </form>

        {sent && (
          <div style={{ marginTop: '15px', padding: '10px', background: '#fef3c7', color: '#92400e', borderRadius: '4px', fontSize: '14px' }}>
            {sent}
          </div>
        )}

        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
          <Link to="/forgot-password" style={{ color: '#2563eb', textDecoration: 'none' }}>Şifremi unuttum</Link>
          <Link to="/register" style={{ color: '#2563eb', textDecoration: 'none' }}>Hesabın yok mu? Kayıt ol</Link>
        </div>
      </div>
    </div>
  );
}