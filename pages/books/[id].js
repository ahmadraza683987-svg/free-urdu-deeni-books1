import { useRouter } from "next/router";
import booksData from "../../data/books.json";

export default function Book() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <p>Loading...</p>;

  const book = booksData.find((b) => b.id === id);
  if (!book) return <p>کتاب موجود نہیں</p>;

  // Front page image ka path (JPG ke liye)
  const frontPageImage = book.file.replace(".pdf", ".jpg");

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontFamily: "'Alqalam Ishtiaq', serif" }}>{book.title}</h1>
      <p>مصنف: {book.author}</p>

      {/* Book front page */}
      <div style={{ margin: "20px 0" }}>
        <img
          src={frontPageImage}
          alt={`${book.title} front page`}
          style={{
            maxWidth: "100%",
            height: "auto",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)"
          }}
          onError={(e) => {
            // agar image available nahi hai to default msg show hoga
            e.target.style.display = "none";
          }}
        />
      </div>

      {/* Buttons */}
      <div style={{ marginTop: "20px" }}>
        {/* Read button */}
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
          📖 Read Online
        </a>

        {/* Download button */}
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