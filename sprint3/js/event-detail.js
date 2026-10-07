import { events } from "./data.js";

const container = document.querySelector("#detay");

if (container) {
  const id = new URLSearchParams(window.location.search).get("id");
  const event = events.find((e) => e.id === id);

  if (!event) {
    document.title = "Etkinlik Bulunamadı";
    container.innerHTML = `
      <div class="hata-kutusu">
        <h2>Etkinlik bulunamadı</h2>
        <p>"${id || 'Bilinmeyen'}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.</p>
        <a href="etkinlikler.html" class="btn">Listeye dön</a>
      </div>
    `;
  } else {
    document.title = event.title;
    const tarihFormatted = new Date(event.date).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    container.innerHTML = `
      <h1>${event.title}</h1>
      <div class="detay-duzen">
        <div class="detay-sol">
          <p class="aciklama-baslik"><strong>Açıklama</strong></p>
          <p>${event.description}</p>
          <div class="butonlar">
            <a href="etkinlikler.html" class="btn">← Listeye dön</a>
            <a href="etkinlik-guncelle.html?id=${event.id}" class="btn btn-secondary">Bu etkinliği güncelle</a>
          </div>
        </div>
        <div class="detay-sag">
          <div class="kunye-kutusu">
            <h3>Etkinlik Künyesi</h3>
            <dl>
              <dt>Tarih</dt>
              <dd>${tarihFormatted}, ${event.time}</dd>
              <dt>Yer</dt>
              <dd>${event.location}</dd>
              <dt>Kategori</dt>
              <dd>${event.category}</dd>
              <dt>Kontenjan</dt>
              <dd>${event.capacity} kişi</dd>
            </dl>
          </div>
        </div>
      </div>
    `;
  }
}