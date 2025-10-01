// /components/Contact.js
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

export default function Contact() {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [editId, setEditId] = useState(null);

  const commentsCollection = collection(db, "comments");

  // 🔹 Load comments from Firestore
  const fetchComments = async () => {
    const q = query(commentsCollection, orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    const loadedComments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setComments(loadedComments);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // 🔹 Add or update comment
  const handleSubmit = async () => {
    if (!commentText.trim()) return;

    if (editId) {
      // Update existing comment
      await updateDoc(doc(db, "comments", editId), {
        text: commentText,
        timestamp: serverTimestamp(),
      });
      setEditId(null);
    } else {
      // Add new comment
      await addDoc(commentsCollection, {
        text: commentText,
        timestamp: serverTimestamp(),
      });
    }

    setCommentText("");
    fetchComments();
  };

  // 🔹 Edit comment
  const handleEdit = (id, text) => {
    setEditId(id);
    setCommentText(text);
  };

  // 🔹 Delete comment
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "comments", id));
    fetchComments();
  };

  return (
    <div style={{ marginTop: "40px", padding: "20px", borderTop: "1px solid #ccc" }}>
      <h2>💬 اپنی رائے دیں / Contact</h2>

      {/* Comment Box */}
      <textarea
        placeholder="اپنی رائے یہاں لکھیں..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
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
        onClick={handleSubmit}
      >
        {editId ? "Update Comment" : "Submit"}
      </button>

      {/* List of Comments */}
      {comments.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>💬 موجودہ رائے / Comments:</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {comments.map((c) => (
              <li
                key={c.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <p>{c.text}</p>
                <small style={{ color: "#555" }}>
                  {c.timestamp?.toDate ? c.timestamp.toDate().toLocaleString() : ""}
                </small>
                <div style={{ marginTop: "5px" }}>
                  <button
                    onClick={() => handleEdit(c.id, c.text)}
                    style={{
                      marginRight: "10px",
                      padding: "5px 10px",
                      backgroundColor: "#facc15",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

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