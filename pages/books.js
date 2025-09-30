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
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Filter books based on search & selected subcategory
  const filteredBooks = booksData.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedSubcategory ? book.subcategory === selectedSubcategory : true)
  );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "32px",
          marginBottom: "20px",
          fontFamily: "'AlQalam Ishtiaq', serif"
        }}
      >
        📚 کیٹیگریز | Categories
      </h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="🔍 سرچ کریں / Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "25px",
          fontSize: "16px"
        }}
      />

      {/* Categories */}
      {categories.map((cat) => (
        <div key={cat.name} style={{ marginBottom: "30px" }}>
          <h2
            style={{
              fontSize: "24px",
              color: "#444",
              fontFamily: "'AlQalam Ishtiaq', serif"
            }}
          >
            📂 {cat.name}
          </h2>

          {cat.subcategories.map((sub) => {
            const booksInSub = booksData.filter(
              (b) => b.category === cat.name && b.subcategory === sub
            );

            return (
              <div key={sub} style={{ marginLeft: "20px", marginBottom: "15px" }}>
                {/* Subcategory name */}
                <h3
                  onClick={() =>
                    setSelectedSubcategory(selectedSubcategory === sub ? null : sub)
                  }
                  style={{
                    cursor: "pointer",
                    color: "#0055aa",
                    transition: "color 0.3s",
                    fontSize: "20px",
                    fontFamily: "'AlQalam Ishtiaq', serif"
                  }}
                >
                  ➡ {sub} {selectedSubcategory === sub ? "(Showing)" : ""}
                </h3>

                {/* Show books only if selected */}
                {selectedSubcategory === sub && (
                  <>
                    {booksInSub.length > 0 ? (
                      <ul style={{ marginTop: "10px", fontFamily: "sans-serif" }}>
                        {booksInSub.map((b) => (
                          <li key={b.title} style={{ marginBottom: "8px" }}>
                            <a
                              href={b.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#0077cc",
                                textDecoration: "underline",
                                fontSize: "18px",
                                fontFamily: "sans-serif"
                              }}
                            >
                              {b.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ color: "gray", fontStyle: "italic" }}>
                        کوئی کتاب موجود نہیں | No books available
                      </p>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Search no result */}
      {filteredBooks.length === 0 && search && (
        <p style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
          ❌ کوئی رزلٹ نہیں ملا | No results found
        </p>
      )}
    </div>
  );
}