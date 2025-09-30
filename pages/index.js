import Link from "next/link";
import { useState } from "react";
import booksData from "../data/books.json";

const categories = [
  { name: "Darsi Kitaben (درسی کتابیں)" },
  { name: "Ghair Darsi Kitaben (غیر درسی کتابیں)" }
];

export default function Home() {
  const [search, setSearch] = useState("");
  const filteredBooks = booksData.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", fontSize: "32px", fontFamily: "'AlQalam Ishtiaq', serif", marginBottom: "20px" }}>
        📚 فری دینی اردو کتابیں | Free Urdu Books
      </h1>

      <input
        type="text"
        placeholder="🔍 سرچ کریں / Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px"
        }}
      />

      {search ? (
        <>
          {filteredBooks.length > 0 ? (
            <ul>
              {filteredBooks.map(book => (
                <li key={book.id} style={{ marginBottom: "10px" }}>
                  <Link href={`/books/${book.id}`}>
                    <a style={{ color: "blue", textDecoration: "underline" }}>{book.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "red" }}>❌ کوئی رزلٹ نہیں ملا | No results found</p>
          )}
        </>
      ) : (
        <>
          <h2 style={{ fontFamily: "'AlQalam Ishtiaq', serif" }}>📂 Categories</h2>
          <ul>
            {categories.map(cat => (
              <li key={cat.name} style={{ marginBottom: "10px" }}>
                <Link href={`/category/${encodeURIComponent(cat.name)}`}>
                  <a style={{ color: "blue", textDecoration: "underline", fontSize: "18px" }}>{cat.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}