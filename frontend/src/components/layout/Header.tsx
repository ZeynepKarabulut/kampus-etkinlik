import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  let title = "Kampüs Etkinlikleri";
  let subtitle = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";

  if (location.pathname === "/") {
    title = "Kampüs Etkinlikleri";
    subtitle = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";
  } else if (location.pathname === "/events") {
    title = "Tüm Etkinlikler";
    subtitle = "Ekim ayında kampüste düzenlenen etkinlikler.";
  } else if (location.pathname.startsWith("/admin")) {
    title = "Etkinlik Yönetimi";
    subtitle = "Mevcut etkinlikleri düzenleyebilir veya silebilirsiniz.";
  } else if (location.pathname === "/login") {
    title = "Giriş Yap";
    subtitle = "Kampüs etkinlik platformuna hoş geldiniz.";
  } else if (location.pathname === "/register") {
    title = "Kayıt Ol";
    subtitle = "Yeni bir hesap oluşturarak etkinliklere katılın.";
  } else if (location.pathname === "/forgot-password") {
    title = "Şifremi Unuttum";
    subtitle = "Şifrenizi yenilemek için e-posta adresinizi girin.";
  } else if (location.pathname.startsWith("/events/")) {
    title = "Etkinlik Detayı";
    subtitle = "Etkinlik detaylarını inceleyin.";
  }

  return (
    <header>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}