import { useState } from 'react';
import { Link } from 'react-router-dom';

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [sent, setSent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found: RegisterErrors = {};
    if (name.trim().length < 3) found.name = 'Ad Soyad en az 3 karakter olmalıdır.';
    if (!email.includes('@')) found.email = 'Geçerli bir e-posta girin.';
    if (password.length < 6) found.password = 'Şifre en az 6 karakter olmalıdır.';
    if (password2 !== password) found.password2 = 'Şifreler aynı değil.';
    
    setErrors(found);
    if (Object.keys(found).length === 0) {
      setSent('Kayıt başarıyla oluşturuldu');
    } else {
      setSent('');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Kayıt Ol</h1>
        <p>Yeni bir hesap oluşturarak etkinliklere katılın.</p>
      </header>

      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Ad Soyad</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Adınız Soyadınız" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
            {errors.name && <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '4px' }}>{errors.name}</p>}
          </div>

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

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Şifre (Tekrar)</label>
            <input 
              type="password" 
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="********" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
            {errors.password2 && <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '4px' }}>{errors.password2}</p>}
          </div>

          <button type="submit" style={{ width: '100%', padding: '10px' }}>Kayıt Ol</button>
        </form>

        {sent && (
          <div style={{ marginTop: '15px', padding: '10px', background: '#ecfdf5', color: '#065f46', borderRadius: '4px', fontSize: '14px' }}>
            {sent}
          </div>
        )}

        <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
          <Link to="/login" style={{ color: '#2563eb', textDecoration: 'none' }}>Zaten hesabın var mı? Giriş yap</Link>
        </div>
      </div>
    </div>
  );
}