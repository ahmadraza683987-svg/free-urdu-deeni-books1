import { useState } from "react";
import booksData from "../data/books.json";

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
  const filteredBooks = booksData.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.category.toLowerCase().includes(search.toLowerCase()) ||
      book.subcategory.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>📚 کیٹیگریز</h1>

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

      {categories.map((cat) => (
        <div key={cat.name} style={{ marginBottom: "30px" }}>
          <h2>📂 {cat.name}</h2>

          {cat.subcategories.map((sub) => {
            const booksInSub = filteredBooks.filter(
              (b) => b.category === cat.name && b.subcategory === sub
            );

            return (
              <div key={sub} style={{ marginLeft: "20px", marginBottom: "15px" }}>
                <h3>➡ {sub}</h3>
                {booksInSub.length > 0 ? (
                  <ul>
                    {booksInSub.map((b) => (
                      <li key={b.title}>
                        <a
                          href={b.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "blue", textDecoration: "underline" }}
                        >
                          {b.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: "gray" }}>کوئی کتاب موجود نہیں</p>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {filteredBooks.length === 0 && search && (
        <p style={{ color: "red" }}>❌ کوئی رزلٹ نہیں ملا</p>
      )}
    </div>
  );
}