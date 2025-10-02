// /components/Comments.js
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const commentsCollection = collection(db, "comments");

  useEffect(() => {
    const fetchComments = async () => {
      const q = query(commentsCollection, orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchComments();
  }, []);

  const handleSubmit = async () => {
    if (!text) return;
    await addDoc(commentsCollection, {
      text,
      timestamp: new Date()
    });
    setText("");
    const snapshot = await getDocs(query(commentsCollection, orderBy("timestamp", "desc")));
    setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "comments", id));
    setComments(comments.filter(c => c.id !== id));
  };

  const handleEdit = async (id, newText) => {
    const docRef = doc(db, "comments", id);
    await updateDoc(docRef, { text: newText });
    setComments(comments.map(c => (c.id === id ? { ...c, text: newText } : c)));
  };

  return (
    <div style={{ marginTop: "40px", padding: "20px", borderTop: "1px solid #ccc" }}>
      <h2>💬 اپنی رائے دیں / Comments</h2>

      <textarea
        placeholder="اپنی رائے یہاں لکھیں..."
        value={text}
        onChange={(e) => setText(e.target.value)}
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
        Submit
      </button>

      <div style={{ marginTop: "20px" }}>
        {comments.map((c) => (
          <div key={c.id} style={{ marginBottom: "10px", padding: "10px", backgroundColor: "#f3f4f6", borderRadius: "5px" }}>
            <p>{c.text}</p>
            <button onClick={() => handleDelete(c.id)} style={{ marginRight: "10px" }}>Delete</button>
            <button onClick={() => {
              const newText = prompt("Edit your comment:", c.text);
              if (newText) handleEdit(c.id, newText);
            }}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}