# Kampüs Etkinlikleri Backend API

Çalıştırma komutları:
- Bağımlılıkları yükle: `npm install`
- Geliştirme modunda başlat: `npm run dev`

## Port ve Ortam Değişkenleri
- `PORT`: 3000

## REST Sözleşmesi (Endpoints)

| Method | Endpoint | Amaç | Başarılı Durum | Hata Durumu |
| :--- | :--- | :--- | :--- | :--- |
| GET | `/health` | Sağlık kontrolü ve öğrenci no | 200 OK | - |
| GET | `/events` | Tüm etkinlikleri getir (kategori filtresi var) | 200 OK | - |
| GET | `/events/:id` | Tek bir etkinliği getir | 200 OK | 404 Not Found |
| POST | `/events` | Yeni etkinlik ekle | 201 Created | 400 Bad Request |