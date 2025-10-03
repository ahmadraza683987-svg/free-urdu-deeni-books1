// /components/Comments.js
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const commentsCollection = collection(db, "comments");

  // Fetch comments from Firestore
  useEffect(() => {
    const fetchComments = async () => {
      const q = query(commentsCollection, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchComments();
  }, []);

  // Submit new comment
  const handleSubmit = async () => {
    if (!name || !email || !text) return alert("تمام fields بھرنا ضروری ہیں!");
    await addDoc(commentsCollection, {
      name,
      email,
      comment: text,
      createdAt: serverTimestamp()
    });
    setName("");
    setEmail("");
    setText("");

    const snapshot = await getDocs(query(commentsCollection, orderBy("createdAt", "desc")));
    setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  // Delete comment
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "comments", id));
    setComments(comments.filter(c => c.id !== id));
  };

  // Edit comment
  const handleEdit = async (id, newText) => {
    const docRef = doc(db, "comments", id);
    await updateDoc(docRef, { comment: newText });
    setComments(comments.map(c => (c.id === id ? { ...c, comment: newText } : c)));
  };

  return (
    <div style={{ marginTop: "40px", padding: "20px", borderTop: "1px solid #ccc" }}>
      <h2>💬 اپنی رائے دیں / Comments</h2>

      <input
        type="text"
        placeholder="اپنا نام لکھیں"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: "10px", borderRadius: "5px", marginTop: "10px" }}
      />
      <input
        type="email"
        placeholder="اپنا email لکھیں"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "10px", borderRadius: "5px", marginTop: "10px" }}
      />
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
            <p><strong>{c.name}</strong> ({c.email})</p>
            <p>{c.comment}</p>
            <small>{c.createdAt?.toDate ? c.createdAt.toDate().toLocaleString() : ""}</small>
            <div style={{ marginTop: "5px" }}>
              <button onClick={() => handleDelete(c.id)} style={{ marginRight: "10px" }}>Delete</button>
              <button onClick={() => {
                const newText = prompt("Edit your comment:", c.comment);
                if (newText) handleEdit(c.id, newText);
              }}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}