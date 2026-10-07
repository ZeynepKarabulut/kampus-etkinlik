import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const aramaInput = document.querySelector("#arama");
const kategoriSelect = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

// Kart Şablonu Üretici (Tam Görseldeki Düzende)
function createCard(event) {
  const tarihFormatted = new Date(event.date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return `
    <article class="kart">
      <h3>${event.title}</h3>
      <p class="kategori-etiket">${event.category}</p>
      <p><strong>Tarih:</strong> ${tarihFormatted}, ${event.time}</p>
      <p><strong>Yer:</strong> ${event.location}</p>
      <p><strong>Kontenjan:</strong> ${event.capacity} kişi</p>
      <p class="aciklama">${event.description}</p>
      <a href="etkinlik-detay.html?id=${event.id}" class="detay-link">Detayları gör</a>
    </article>
  `;
}

function render(dizi) {
  if (!list) return;
  if (dizi.length === 0) {
    list.innerHTML = "";
    if (sonucSatiri) sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
    return;
  }
  list.innerHTML = dizi.map(createCard).join("");
  if (sonucSatiri) {
    sonucSatiri.textContent = `${dizi.length} etkinlik listeleniyor.`;
  }
}

// Sayfa Yükleme Mantığı
if (list) {
  if (list.dataset.limit) {
    // Ana Sayfa: Tarihe göre sırala ve ilk 2 tanesini al
    const yaklasan = [...events]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, Number(list.dataset.limit));
    render(yaklasan);
  } else {
    // Liste Sayfası
    render(events);
    setupFilters();
  }
}

function setupFilters() {
  if (!kategoriSelect || !aramaInput) return;

  // Kategori Seçeneklerini Doldur
  const kategoriler = [...new Set(events.map((e) => e.category))];
  kategoriler.forEach((kat) => {
    const option = document.createElement("option");
    option.value = kat;
    option.textContent = kat;
    kategoriSelect.appendChild(option);
  });

  function filtrele() {
    const metin = aramaInput.value.toLocaleLowerCase("tr-TR").trim();
    const secilenKategori = kategoriSelect.value;

    const filtrelenmis = events.filter((e) => {
      const metinUyuyor =
        e.title.toLocaleLowerCase("tr-TR").includes(metin) ||
        e.description.toLocaleLowerCase("tr-TR").includes(metin);
      const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;
      return metinUyuyor && kategoriUyuyor;
    });

    render(filtrelenmis);
  }

  aramaInput.addEventListener("input", filtrele);
  kategoriSelect.addEventListener("change", filtrele);
}