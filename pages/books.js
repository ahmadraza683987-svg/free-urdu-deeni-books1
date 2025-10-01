import { useState } from "react";
import Link from "next/link";
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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Filtering books
  const filteredBooks = booksData.filter((book) => {
    const matchSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchCategory = !selectedCategory || book.category === selectedCategory;
    const matchSubcategory =
      !selectedSubcategory || book.subcategory === selectedSubcategory;

    // Agar search me kuch likha ho to category ignore kar ke direct result dikhaye
    if (search.trim() !== "") {
      return matchSearch;
    }

    return matchSearch && matchCategory && matchSubcategory;
  });

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>📚 کیٹیگریز</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="🔍 کتاب سرچ کریں..."
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

      {/* Agar search hai to direct results dikhaye */}
      {search.trim() !== "" ? (
        <div style={{ marginTop: "20px" }}>
          {filteredBooks.length > 0 ? (
            <ul>
              {filteredBooks.map((b) => (
                <li key={b.id} style={{ marginBottom: "10px" }}>
                  <Link href={`/books/${b.id}`}>
                    <a style={{ color: "blue", textDecoration: "underline" }}>
                      {b.title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "red" }}>❌ کوئی کتاب نہیں ملی</p>
          )}
        </div>
      ) : (
        <>
          {/* Categories */}
          {!selectedCategory &&
            categories.map((cat) => (
              <div key={cat.name} style={{ marginBottom: "20px" }}>
                <div
                  onClick={() => setSelectedCategory(cat.name)}
                  style={{
                    padding: "15px",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "10px",
                    cursor: "pointer"
                  }}
                >
                  {cat.name}
                </div>
              </div>
            ))}

          {/* Subcategories */}
          {selectedCategory &&
            categories
              .filter((c) => c.name === selectedCategory)
              .map((cat) =>
                cat.subcategories.map((sub) => (
                  <div key={sub} style={{ marginBottom: "15px" }}>
                    <div
                      onClick={() => setSelectedSubcategory(sub)}
                      style={{
                        padding: "12px",
                        backgroundColor: "#e5e7eb",
                        borderRadius: "8px",
                        cursor: "pointer"
                      }}
                    >
                      {sub}
                    </div>
                  </div>
                ))
              )}

          {/* Books */}
          {selectedCategory && selectedSubcategory && (
            <div style={{ marginTop: "20px" }}>
              {filteredBooks.length > 0 ? (
                <ul>
                  {filteredBooks.map((b) => (
                    <li key={b.id} style={{ marginBottom: "10px" }}>
                      <Link href={`/books/${b.id}`}>
                        <a style={{ color: "blue", textDecoration: "underline" }}>
                          {b.title}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>کوئی کتاب موجود نہیں</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}