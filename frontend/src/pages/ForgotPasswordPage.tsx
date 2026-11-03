export default function ForgotPasswordPage() {
  return (
    <div className="container">
      <header>
        <h1>Şifremi Unuttum</h1>
        <p>Şifrenizi yenilemek için e-posta adresinizi girin.</p>
      </header>

      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>E-posta Adresi</label>
            <input 
              type="email" 
              placeholder="ornek@ogrenci.edu.tr" 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px' }}>Şifre Sıfırlama Bağlantısı Gönder</button>
        </form>
        <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
          <a href="/login" style={{ color: '#2563eb', textDecoration: 'none' }}>Giriş sayfasına geri dön</a>
        </div>
      </div>
    </div>
  );
}