export default function Contact() {
  return (
    <div style={{ marginTop: "40px", padding: "20px", borderTop: "1px solid #ccc" }}>
      <h2>💬 اپنی رائے دیں / Contact</h2>

      {/* Comment Box */}
      <textarea
        placeholder="اپنی رائے یہاں لکھیں..."
        style={{ width: "100%", padding: "10px", borderRadius: "5px", marginTop: "10px" }}
      />
      <button
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#4ADE80",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => alert("Comment submitted!")}
      >
        Submit
      </button>

      {/* Email Contact */}
      <p style={{ marginTop: "15px" }}>
        📧 آپ ہمیں ای میل بھی کر سکتے ہیں:{" "}
        <a href="mailto:ahmadraza683987@gmail.com" style={{ color: "blue", textDecoration: "underline" }}>
          ahmadraza683987@gmail.com
        </a>
      </p>
    </div>
  );
}