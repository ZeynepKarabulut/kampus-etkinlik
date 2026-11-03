export default function RegisterPage() {
  return (
    <div className="container">
      <header>
        <h1>Kayıt Ol</h1>
        <p>Yeni bir hesap oluşturarak kampüs etkinliklerine katılın.</p>
      </header>

      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Ad Soyad</label>
            <input 
              type="text" 
              placeholder="Adınız Soyadınız" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
          </div>
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
          <button type="submit" style={{ width: '100%', padding: '10px' }}>Kayıt Ol</button>
        </form>
        <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
          <a href="/login" style={{ color: '#2563eb', textDecoration: 'none' }}>Zaten hesabın var mı? Giriş yap</a>
        </div>
      </div>
    </div>
  );
}