import { useRouter } from "next/router";
import booksData from "../../data/books.json";

export default function Subcategory() {
  const router = useRouter();
  const { name } = router.query;

  if (!name) return null;

  const booksInSub = booksData.filter(b => b.subcategory === name);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontFamily: "AlQalamIshtiaq, serif", fontSize: "28px" }}>{name}</h1>
      {booksInSub.length > 0 ? (
        <ul>
          {booksInSub.map(b => (
            <li key={b.id}>
              <a href={`/books/${b.id}`} style={{ color: "blue", textDecoration: "underline" }}>
                {b.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "gray" }}>کوئی کتاب موجود نہیں / No books available</p>
      )}
    </div>
  );
}