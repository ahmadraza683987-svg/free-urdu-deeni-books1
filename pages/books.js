import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const { category } = router.query;

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  useEffect(() => {
    if (category) setSelectedCategory(category);
  }, [category]);

  const filteredBooks = booksData.filter(
    (book) =>
      (!selectedCategory || book.category === selectedCategory) &&
      (!selectedSubcategory || book.subcategory === selectedSubcategory) &&
      (book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.category.toLowerCase().includes(search.toLowerCase()) ||
        book.subcategory.toLowerCase().includes(search.toLowerCase()))
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

      {/* Categories */}
      {!selectedCategory &&
        categories.map((cat) => (
          <div key={cat.name} style={{ marginBottom: "20px" }}>
            <Link href={`/books?category=${cat.name}`}>
              <div
                style={{
                  padding: "15px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "10px",
                  cursor: "pointer"
                }}
              >
                {cat.name}
              </div>
            </Link>
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

      {filteredBooks.length === 0 && search && (
        <p style={{ color: "red" }}>❌ کوئی رزلٹ نہیں ملا</p>
      )}
    </div>
  );
}