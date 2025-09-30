import { useRouter } from "next/router";
import booksData from "../../data/books.json";

export default function Book() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  const book = booksData.find(b => b.id === parseInt(id));
  if (!book) return <p>Book not found</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontFamily: "'AlQalam Ishtiaq', serif", fontSize: "28px", marginBottom: "20px" }}>
        {book.title}
      </h1>

      <div style={{ marginBottom: "20px" }}>
        <a
          href={book.file}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginRight: "20px", color: "green", textDecoration: "underline", fontSize: "18px" }}
        >
          📖 Read Online
        </a>
        <a
          href={book.file}
          download
          style={{ color: "orange", textDecoration: "underline", fontSize: "18px" }}
        >
          ⬇ Download
        </a>
      </div>

      <iframe
        src={book.file}
        width="100%"
        height="600px"
        style={{ border: "1px solid #ccc" }}
      ></iframe>
    </div>
  );
}