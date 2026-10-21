interface EventFormProps {
  title: string;
  onSubmit: () => void;
}

export default function EventForm({ title, onSubmit }: EventFormProps) {
  return (
    <form className="form" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <h2>{title}</h2>
      <p style={{ fontSize: "0.85rem", color: "#666" }}>
        Bu sprintte form sadece görünüm; kayıt yapılmaz[cite: 38].
      </p>

      <label htmlFor="title">Etkinlik Adı *</label>
      <input id="title" maxLength={80} placeholder="Örn. Kariyer Günleri 2026" />

      <label htmlFor="category">Kategori *</label>
      <select id="category">
        <option value="">Seçiniz</option>
        <option value="Seminer">Seminer</option>
        <option value="Atölye">Atölye</option>
        <option value="Söyleşi">Söyleşi</option>
        <option value="Yarışma">Yarışma</option>
      </select>

      <label htmlFor="date">Tarih *</label>
      <input type="date" id="date" />

      <label htmlFor="time">Saat *</label>
      <input type="time" id="time" />

      <label htmlFor="location">Yer *</label>
      <input id="location" placeholder="Örn. A Blok Konferans Salonu" />

      <label htmlFor="capacity">Kontenjan</label>
      <input type="number" id="capacity" />

      <label htmlFor="description">Açıklama</label>
      <textarea id="description" rows={5} />

      <button type="submit" className="btn">Kaydet</button>
    </form>
  );
}