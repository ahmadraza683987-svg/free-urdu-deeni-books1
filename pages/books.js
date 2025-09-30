// pages/books.js
import { useState } from "react";

// Temporary categories
const categories = [
  {
    name: "Darsi Kitaben (درسی کتابیں)",
    subcategories: ["Kitaben (کتابیں)", "Shuruhaat (شروحات)"]
  },
  {
    name: "Ghair Darsi Kitaben (غیر درسی کتابیں)",
    subcategories: []
  }
];

export default function Books() {
  const [search, setSearch] = useState("");

  // Filter categories based on search
  const filtered = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.subcategories.some((sub) =>
        sub.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>📚 کیٹیگریز</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="🔍 سرچ کریں..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "20px",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      {/* Show Filtered Categories */}
      {filtered.map((cat) => (
        <div key={cat.name} style={{ marginBottom: "30px" }}>
          <h2>📂 {cat.name}</h2>
          {cat.subcategories.length > 0 ? (
            <ul>
              {cat.subcategories.map((sub) => (
                <li key={sub}>➡ {sub}</li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "gray" }}>کوئی سب کیٹیگری موجود نہیں</p>
          )}
        </div>
      ))}

      {filtered.length === 0 && (
        <p style={{ color: "red" }}>❌ کوئی رزلٹ نہیں ملا</p>
      )}
    </div>
  );
}