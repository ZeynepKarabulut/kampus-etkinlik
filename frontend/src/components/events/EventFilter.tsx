import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  onSearchChange: (text: string) => void;
  onCategoryChange: (cat: Category | "") => void;
}

export default function EventFilter({
  searchText,
  category,
  onSearchChange,
  onCategoryChange
}: EventFilterProps) {
  return (
    <div className="filtreler">
      <input
        type="search"
        id="arama"
        placeholder="Örn. atölye, kariyer"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        id="kategori-filtre"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value as Category | "")}
      >
        <option value="">Tümü</option>
        <option value="Seminer">Seminer</option>
        <option value="Atölye">Atölye</option>
        <option value="Söyleşi">Söyleşi</option>
        <option value="Yarışma">Yarışma</option>
      </select>
    </div>
  );
}