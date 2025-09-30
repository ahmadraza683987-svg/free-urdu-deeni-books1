import { useState } from "react";
import booksData from "../data/books.json";

const categories = [
  {
    name: "Darsi Kitaben (درسی کتابیں)",
    subcategories: ["Kitaben (کتابیں)", "Shuruhaat (شروحات)"]
  },
  {
    name: "Ghair Darsi Kitaben (غیر درسی کتابیں)",
    subcategories: [] // کوئی subcategory نہیں
  }
];

export default function Books() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Filter books based on category/subcategory or search
  const filteredBooks = booksData.filter((book) => {
    if (search) {
      return (
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.category.toLowerCase().includes(search.toLowerCase()) ||
        book.subcategory.toLowerCase().includes(search.toLowerCase())
      );
    } else if (selectedCategory) {
      if (selectedSubcategory) {
        return (
          book.category === selectedCategory && book.subcategory === selectedSubcategory
        );
      } else {
        return book.category === selectedCategory;
      }
    } else {
      return true;
    }
  });

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>📚 Categories</h1>

      <input
        type="text"
        placeholder="🔍 Search..."
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

      {!selectedCategory &&
        categories.map((cat) => (
          <div key={cat.name} style={{ marginBottom: "15px" }}>
            <button onClick={() => setSelectedCategory(cat.name)}>
              📂 {cat.name}
            </button>
          </div>
        ))}

      {selectedCategory &&
        categories
          .filter((cat) => cat.name === selectedCategory)
          .map((cat) => {
            if (cat.subcategories.length > 0 && !selectedSubcategory) {
              // Show subcategories for Darsi Kitaben
              return (
                <div key={cat.name}>
                  <h2>Subcategories:</h2>
                  {cat.subcategories.map((sub) => (
                    <button
                      key={sub}
                      style={{ display: "block", margin: "5px 0" }}
                      onClick={() => setSelectedSubcategory(sub)}
                    >
                      ➡ {sub}
                    </button>
                  ))}
                  <button
                    style={{ marginTop: "10px" }}
                    onClick={() => setSelectedCategory(null)}
                  >
                    🔙 Back to Categories
                  </button>
                </div>
              );
            } else {
              // Show books if no subcategory or subcategory selected
              return (
                <div key={cat.name}>
                  <h2>Books:</h2>
                  <ul>
                    {filteredBooks.length > 0 ? (
                      filteredBooks.map((b) => (
                        <li key={b.title}>
                          <a
                            href={b.file}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {b.title}
                          </a>
                        </li>
                      ))
                    ) : (
                      <p style={{ color: "gray" }}>No books available</p>
                    )}
                  </ul>
                  <button
                    style={{ marginTop: "10px" }}
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedSubcategory(null);
                    }}
                  >
                    🔙 Back to Categories
                  </button>
                </div>
              );
            }
          })}

      {selectedSubcategory && (
        <div>
          <h2>Books:</h2>
          <ul>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((b) => (
                <li key={b.title}>
                  <a href={b.file} target="_blank" rel="noopener noreferrer">
                    {b.title}
                  </a>
                </li>
              ))
            ) : (
              <p style={{ color: "gray" }}>No books available</p>
            )}
          </ul>
          <button
            style={{ marginTop: "10px" }}
            onClick={() => setSelectedSubcategory(null)}
          >
            🔙 Back to Subcategories
          </button>
        </div>
      )}

      {filteredBooks.length === 0 && search && (
        <p style={{ color: "red" }}>❌ No results found</p>
      )}
    </div>
  );
}