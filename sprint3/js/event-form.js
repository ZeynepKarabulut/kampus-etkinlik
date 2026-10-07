import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesajKutusu = document.querySelector("#form-mesaj");

if (form) {
  const mode = form.dataset.mode; // "guncelle" veya undefined
  const id = new URLSearchParams(window.location.search).get("id");

  // Güncelleme Modu Kontrolü
  if (mode === "guncelle") {
    const etkinlik = events.find((e) => e.id === id);
    if (!etkinlik) {
      form.outerHTML = `
        <div class="hata-kutusu">
          <p>Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
          <a href="etkinlikler.html" class="btn">Etkinliklere git</a>
        </div>
      `;
    } else {
      // Alanları var olan veriyle doldur
      if (form.elements["ad"]) form.elements["ad"].value = etkinlik.title;
      if (form.elements["kategori"]) form.elements["kategori"].value = etkinlik.category;
      if (form.elements["tarih"]) form.elements["tarih"].value = etkinlik.date;
      if (form.elements["saat"]) form.elements["saat"].value = etkinlik.time;
      if (form.elements["yer"]) form.elements["yer"].value = etkinlik.location;
      if (form.elements["kontenjan"]) form.elements["kontenjan"].value = etkinlik.capacity;
      if (form.elements["aciklama"]) form.elements["aciklama"].value = etkinlik.description;
    }
  }

  // Form Gönderim Yakalama
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Hata temizliği
    document.querySelectorAll(".hata-mesaj").forEach((span) => (span.textContent = ""));
    document.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
    if (mesajKutusu) mesajKutusu.innerHTML = "";

    const fd = new FormData(form);
    const data = {
      id: mode === "guncelle" ? id : `event-${events.length + 1}`,
      title: fd.get("ad") ? fd.get("ad").trim() : "",
      category: fd.get("kategori") || "",
      date: fd.get("tarih") || "",
      time: fd.get("saat") || "",
      location: fd.get("yer") ? fd.get("yer").trim() : "",
      capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null,
      description: fd.get("aciklama") ? fd.get("aciklama").trim() : ""
    };

    // Doğrulama Kuralları
    const errors = {};
    if (!data.title || data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
    if (!data.category) errors.kategori = "Bir kategori seçin.";
    if (!data.date) errors.tarih = "Tarih seçin.";
    if (!data.time) errors.saat = "Saat seçin.";
    if (!data.location) errors.yer = "Yer bilgisini yazın.";
    if (data.capacity && (data.capacity < 1 || data.capacity > 1000)) {
      errors.kontenjan = "Kontenjan 1-1000 arasında olmalıdır.";
    }

    // Hataları Ekrana Basma
    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach((key) => {
        const alan = form.elements[key];
        const hataSpan = document.querySelector(`#${key}-hata`);
        if (alan) alan.setAttribute("aria-invalid", "true");
        if (hataSpan) hataSpan.textContent = errors[key];
      });
      return;
    }

    // Başarılı Gönderim Durumu
    const basariBaslik = mode === "guncelle" 
      ? "Etkinlik güncellendi (bu sprintte kaydedilmez):" 
      : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";

    if (mesajKutusu) {
      mesajKutusu.innerHTML = `
        <div class="basari-kutusu">
          <p>${basariBaslik}</p>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        </div>
      `;
    }
  });
}