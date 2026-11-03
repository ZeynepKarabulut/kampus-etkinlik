import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="nav" style={{ display: 'flex', gap: '20px', padding: '10px 0', alignItems: 'center' }}>
      <NavLink to="/" end style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', textDecoration: 'none', color: '#2c3e50' })}>
        Ana Sayfa
      </NavLink>
      <NavLink to="/events" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', textDecoration: 'none', color: '#2c3e50' })}>
        Etkinlikler
      </NavLink>
      <NavLink to="/admin" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', textDecoration: 'none', color: '#2c3e50' })}>
        Yönetim
      </NavLink>
      <NavLink to="/login" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', textDecoration: 'none', color: '#2c3e50' })}>
        Giriş
      </NavLink>
    </nav>
  );
}