import { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; // 🔹 Firebase Config
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";

export default function Contact() {
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchComments = async () => {
    const querySnapshot = await getDocs(collection(db, "comments"));
    const commentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCommentsList(commentsData);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async () => {
    if (!comment) return;
    if (editingId) {
      // 🔹 Update comment
      const commentRef = doc(db, "comments", editingId);
      await updateDoc(commentRef, { text: comment, timestamp: serverTimestamp() });
      setEditingId(null);
    } else {
      // 🔹 Add new comment
      await addDoc(collection(db, "comments"), { text: comment, timestamp: serverTimestamp() });
    }
    setComment("");
    fetchComments();
  };

  const handleEdit = (c) => {
    setComment(c.text);
    setEditingId(c.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "comments", id));
    fetchComments();
  };

  return (
    <div style={{ marginTop: "40px", padding: "20px", borderTop: "1px solid #ccc" }}>
      <h2>💬 اپنی رائے دیں / Contact</h2>

      <textarea
        placeholder="اپنی رائے یہاں لکھیں..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
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
        {editingId ? "Update Comment" : "Submit"}
      </button>

      {/* Email Contact */}
      <p style={{ marginTop: "15px" }}>
        📧 آپ ہمیں ای میل بھی کر سکتے ہیں:{" "}
        <a href="mailto:ahmadraza683987@gmail.com" style={{ color: "blue", textDecoration: "underline" }}>
          ahmadraza683987@gmail.com
        </a>
      </p>

      {/* Comments List */}
      <div style={{ marginTop: "20px" }}>
        {commentsList.map((c) => (
          <div key={c.id} style={{ borderBottom: "1px solid #ddd", padding: "8px 0" }}>
            <p>{c.text}</p>
            <small>{c.timestamp?.toDate ? c.timestamp.toDate().toLocaleString() : ""}</small>
            <div>
              <button onClick={() => handleEdit(c)} style={{ marginRight: "10px" }}>✏️ Edit</button>
              <button onClick={() => handleDelete(c.id)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}