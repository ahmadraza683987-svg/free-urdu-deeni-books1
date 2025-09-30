import "../styles/globals.css";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  // Load Google Nastaliq Urdu font dynamically
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div>
      {/* Stylish Header */}
      <header
        onClick={toggleActive}
        style={{
          background: active
            ? "linear-gradient(135deg, #fceabb, #f8b500)"
            : "linear-gradient(135deg, #f6e8c3, #f7d68a)",
          padding: "30px 15px",
          textAlign: "center",
          fontSize: "36px",
          fontWeight: "700",
          color: active ? "#b35f00" : "#2a2a2a",
          fontFamily: "'Noto Nastaliq Urdu', serif",
          letterSpacing: "1.2px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.25)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
          borderRadius: "0 0 25px 25px",
          transition: "all 0.5s ease-in-out",
          cursor: "pointer",
          position: "relative",
          userSelect: "none"
        }}
      >
        فری دینی اردو کتابیں | Free Urdu Deeni Books
        <span
          style={{
            position: "absolute",
            bottom: "5px",
            left: "50%",
            transform: "translateX(-50%)",
            width: active ? "90%" : "0%",
            height: "5px",
            backgroundColor: "#b35f00",
            borderRadius: "2px",
            transition: "width 0.4s ease-in-out"
          }}
        />
      </header>

      {/* Page Content */}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;