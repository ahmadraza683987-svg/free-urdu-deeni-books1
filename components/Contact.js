// /components/Contact.js
import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function Contact() {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  // 🔹 Fetch comments from Firestore
  useEffect(() => {
    const q = query(collection(db, "comments"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(fetchedComments);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Submit new comment
  const handleSubmit = async () => {
    if (commentText.trim() === "") return;
    try {
      await addDoc(collection(db, "comments"), {
        text: commentText,
        timestamp: serverTimestamp()
      });
      setCommentText("");
    } catch (err) {
      console.error("Error adding comment: ", err);
    }
  };

  // 🔹 Delete comment
  const handleDelete = async (id) => {
    try {
      await db.collection("comments").doc(id).delete();
    } catch (err) {
      console.error("Error deleting comment: ", err);
    }
  };

  return (
    <div style={{ marginTop: "40px", padding: "20px", borderTop: "1px solid #ccc" }}>
      <h2>💬 اپنی رائے دیں / Contact</h2>

      {/* Comment Box */}
      <textarea
        placeholder="اپنی رائے یہاں لکھیں..."
        style={{ width: "100%", padding: "10px", borderRadius: "5px", marginTop: "10px" }}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
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
        onClick={handleSubmit}
      >
        Submit
      </button>

      {/* Display Comments */}
      <div style={{ marginTop: "20px" }}>
        {comments.length > 0 ? (
          comments.map(c => (
            <div key={c.id} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
              <p>{c.text}</p>
              <button
                onClick={() => handleDelete(c.id)}
                style={{ color: "red", fontSize: "12px", border: "none", background: "none", cursor: "pointer" }}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>کوئی رائے نہیں ہے</p>
        )}
      </div>

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