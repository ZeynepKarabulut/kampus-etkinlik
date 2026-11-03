import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="nav">
      <NavLink to="/" end>Ana Sayfa</NavLink>
      <NavLink to="/events">Etkinlikler</NavLink>
      <NavLink to="/admin">Yönetim</NavLink>
      <NavLink to="/login">Giriş</NavLink>
    </nav>
  );
}