import { useState } from "react";
import booksData from "../data/books.json";

export default function Books() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

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

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = (sub) => {
    setSelectedSubcategory(sub);
  };

  // Filter books by search or selected category/subcategory
  const filteredBooks = booksData.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.category.toLowerCase().includes(search.toLowerCase()) ||
      book.subcategory.toLowerCase().includes(search.toLowerCase()) ||
      (selectedCategory && book.category === selectedCategory) ||
      (selectedSubcategory && book.subcategory === selectedSubcategory)
  );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>📚 Categories</h1>

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

      {!selectedCategory &&
        categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => handleCategoryClick(cat.name)}
            style={{
              marginBottom: "15px",
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline"
            }}
          >
            📂 {cat.name}
          </div>
        ))}

      {selectedCategory &&
        categories
          .find((c) => c.name === selectedCategory)
          .subcategories.map((sub) => (
            <div
              key={sub}
              onClick={() => handleSubcategoryClick(sub)}
              style={{
                marginLeft: "20px",
                marginBottom: "10px",
                cursor: "pointer",
                color: "green",
                textDecoration: "underline"
              }}
            >
              ➡ {sub}
            </div>
          ))}

      {(selectedSubcategory || search) && (
        <div style={{ marginTop: "20px" }}>
          <h2>📖 Books</h2>
          {filteredBooks.length > 0 ? (
            <ul>
              {filteredBooks.map((b) => (
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
            <p style={{ color: "red" }}>❌ کوئی کتاب موجود نہیں</p>
          )}
        </div>
      )}
    </div>
  );
}