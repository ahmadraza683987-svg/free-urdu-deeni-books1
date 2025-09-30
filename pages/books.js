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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const filteredBooks = booksData.filter((book) => {
    let matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.category.toLowerCase().includes(search.toLowerCase()) ||
      book.subcategory.toLowerCase().includes(search.toLowerCase());

    let matchesCategory = selectedCategory ? book.category === selectedCategory : true;
    let matchesSubcategory = selectedSubcategory ? book.subcategory === selectedSubcategory : true;

    return matchesSearch && matchesCategory && matchesSubcategory;
  });

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

      {/* Categories */}
      {categories.map((cat) => (
        <div key={cat.name} style={{ marginBottom: "30px" }}>
          <h2
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedCategory(cat.name);
              setSelectedSubcategory(null);
            }}
          >
            📂 {cat.name}
          </h2>

          {/* Subcategories (if any) */}
          {cat.subcategories.length > 0 && selectedCategory === cat.name && (
            <div style={{ marginLeft: "20px", marginBottom: "15px" }}>
              {cat.subcategories.map((sub) => {
                const booksInSub = filteredBooks.filter(
                  (b) => b.category === cat.name && b.subcategory === sub
                );

                return (
                  <div key={sub} style={{ marginBottom: "15px" }}>
                    <h3
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedSubcategory(sub)}
                    >
                      ➡ {sub}
                    </h3>
                    {selectedSubcategory === sub && (
                      <>
                        {booksInSub.length > 0 ? (
                          <ul>
                            {booksInSub.map((b) => (
                              <li key={b.id}>
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
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* For categories with no subcategories */}
          {cat.subcategories.length === 0 && selectedCategory === cat.name && (
            <ul>
              {filteredBooks
                .filter((b) => b.category === cat.name)
                .map((b) => (
                  <li key={b.id}>
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
          )}
        </div>
      ))}

      {filteredBooks.length === 0 && search && (
        <p style={{ color: "red" }}>❌ کوئی رزلٹ نہیں ملا</p>
      )}
    </div>
  );
}