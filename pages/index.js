import { useState } from "react";
import booksData from "../data/books.json";

const categories = [
  "Darsi Kitaben (درسی کتابیں)",
  "Ghair Darsi Kitaben (غیر درسی کتابیں)"
];

export default function Home() {
  const [search, setSearch] = useState("");
  const filteredBooks = booksData.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.category.toLowerCase().includes(search.toLowerCase()) ||
      book.subcategory.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontFamily: "AlQalamIshtiaq, serif", fontSize: "28px" }}>📚 فری دینی اردو کتابیں / Free Urdu Books</h1>

      <input
        type="text"
        placeholder="🔍 سرچ کریں / Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          margin: "20px 0",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      {search && filteredBooks.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {filteredBooks.map((b) => (
              <li key={b.id}>
                <a href={`/books/${b.id}`} style={{ color: "blue", textDecoration: "underline" }}>
                  {b.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!search && (
        <div>
          <h2>Categories:</h2>
          <ul>
            {categories.map((cat) => (
              <li key={cat}>
                <a href={`/category/${encodeURIComponent(cat)}`} style={{ color: "blue", textDecoration: "underline" }}>
                  {cat}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {search && filteredBooks.length === 0 && (
        <p style={{ color: "red" }}>❌ کوئی رزلٹ نہیں ملا / No results found</p>
      )}
    </div>
  );
}