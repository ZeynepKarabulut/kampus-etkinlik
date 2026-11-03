interface HeaderProps {
  title?: string;
  text?: string;
}

export function Header({ title = "Kampüs Etkinlikleri", text }: HeaderProps) {
  return (
    <header className="header" style={{ backgroundColor: "#1e3a8a", color: "white", padding: "20px", borderRadius: "8px" }}>
      <h1>{title}</h1>
      {text && <p style={{ marginTop: "8px", fontSize: "16px" }}>{text}</p>}
    </header>
  );
}