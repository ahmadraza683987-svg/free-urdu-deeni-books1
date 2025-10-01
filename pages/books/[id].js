import { useRouter } from "next/router";
import booksData from "../../data/books.json";

export default function Book() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <p>Loading...</p>;

  const book = booksData.find((b) => b.id === id);
  if (!book) return <p>کتاب موجود نہیں</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "'Alqalam Ishtiaq', serif" }}>
      <h1>{book.title}</h1>
      <p>مصنف: {book.author}</p>
      <p>کیٹیگری: {book.category}</p>
      {book.subcategory && <p>ذیلی کیٹیگری: {book.subcategory}</p>}

      {/* Front Page Image */}
      {book.frontPage && (
        <div style={{ margin: "20px 0" }}>
          <img
            src={book.frontPage}
            alt={`${book.title} Front Page`}
            style={{ maxWidth: "100%", borderRadius: "10px" }}
          />
        </div>
      )}

      {/* Read and Download Buttons */}
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