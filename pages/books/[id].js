import { useRouter } from "next/router";
import booksData from "../../data/books.json";

export default function BookPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <p>Loading...</p>;

  const book = booksData.find((b) => b.id === parseInt(id));

  if (!book) return <p>Book not found</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontFamily: "AlQalam Ishtiaq, sans-serif", fontSize: "28px" }}>
        📖 {book.title}
      </h1>

      {/* PDF Preview */}
      <div style={{ margin: "20px 0" }}>
        <iframe
          src={book.file}
          width="100%"
          height="600px"
          style={{ border: "1px solid #ccc", borderRadius: "5px" }}
          title={book.title}
        ></iframe>
      </div>

      {/* Download Button */}
      <a
        href={book.file}
        download
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "#fff",
          borderRadius: "5px",
          textDecoration: "none",
        }}
      >
        ⬇️ Download
      </a>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => router.back()}
          style={{
            padding: "8px 15px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#f0f0f0",
            cursor: "pointer",
          }}
        >
          🔙 Back
        </button>
      </div>
    </div>
  );
}