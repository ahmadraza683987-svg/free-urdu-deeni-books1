import { useRouter } from "next/router";
import booksData from "../../data/books.json";

export default function Category() {
  const router = useRouter();
  const { name } = router.query;

  if (!name) return null;

  const subcategories = name.includes("Darsi Kitaben") 
    ? ["Kitaben (کتابیں)", "Shuruhaat (شروحات)"] 
    : [];

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontFamily: "AlQalamIshtiaq, serif", fontSize: "28px" }}>{name}</h1>

      {subcategories.length > 0 ? (
        <div>
          <h2>Subcategories:</h2>
          <ul>
            {subcategories.map((sub) => (
              <li key={sub}>
                <a href={`/subcategory/${encodeURIComponent(sub)}`} style={{ color: "blue", textDecoration: "underline" }}>
                  {sub}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>Books:</h2>
          <ul>
            {booksData.filter(b => b.category === name).map(b => (
              <li key={b.id}>
                <a href={`/books/${b.id}`} style={{ color: "blue", textDecoration: "underline" }}>
                  {b.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}