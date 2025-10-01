import { useRouter } from "next/router";
import booksData from "../../data/books.json";

export default function Book() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <p>Loading...</p>;

  const book = booksData.find((b) => b.id === id);
  if (!book) return <p>کتاب موجود نہیں</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontFamily: "'Alqalam Ishtiaq', serif" }}>{book.title}</h1>
      <p>مصنف: {book.author}</p>

      {/* Front page image */}
      {book.frontPage && (
        <div style={{ margin: "20px 0" }}>
          <img
            src={book.frontPage}
            alt={book.title}
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
            }}
          />
        </div>
      )}

      {/* Buttons */}
      <div style={{ marginTop: "20px" }}>
        <a
          href={book.file}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4ADE80",
            color: "white",
            borderRadius: "5px",
            marginRight: "10px",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          📖 Read
        </a>

        <a
          href={book.file}
          download
          style={{
            padding: "10px 20px",
            backgroundColor: "#22D3EE",
            color: "white",
            borderRadius: "5px",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          ⬇️ Download
        </a>
      </div>
    </div>
  );
}