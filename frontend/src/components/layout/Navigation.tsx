import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

export default function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="menu">
      <a
        href="#home"
        onClick={(e) => { e.preventDefault(); onNavigate("home"); }}
        aria-current={current === "home" ? "page" : undefined}
      >
        Ana Sayfa
      </a>{" "}
      &middot;{" "}
      <a
        href="#events"
        onClick={(e) => { e.preventDefault(); onNavigate("events"); }}
        aria-current={current === "events" ? "page" : undefined}
      >
        Etkinlikler
      </a>{" "}
      &middot;{" "}
      <a
        href="#add"
        onClick={(e) => { e.preventDefault(); onNavigate("add"); }}
        aria-current={current === "add" ? "page" : undefined}
      >
        Ekle
      </a>
    </nav>
  );
}