// pages/books.js

// Temporary categories (books add karne se pehle ka structure)
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
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>📚 کیٹیگریز</h1>

      {categories.map((cat) => (
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
    </div>
  );
}