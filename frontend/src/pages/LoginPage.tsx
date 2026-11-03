export default function LoginPage() {
  return (
    <div className="container">
      <header>
        <h1>Giriş Yap</h1>
        <p>Kampüs etkinliklerini yönetmek için hesabınıza giriş yapın.</p>
      </header>

      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>E-posta</label>
            <input 
              type="email" 
              placeholder="ornek@ogrenci.edu.tr" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Şifre</label>
            <input 
              type="password" 
              placeholder="********" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px' }}>Giriş yap</button>
        </form>
        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
          <a href="/forgot-password" style={{ color: '#2563eb', textDecoration: 'none' }}>Şifremi unuttum</a>
          <a href="/register" style={{ color: '#2563eb', textDecoration: 'none' }}>Hesabın yok mu? Kayıt ol</a>
        </div>
      </div>
    </div>
  );
}