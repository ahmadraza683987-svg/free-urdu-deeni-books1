import "../styles/globals.css";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  return (
    <div>
      {/* Stylish Header with AlQalam Ishtiaq Font */}
      <header
        onClick={toggleActive}
        style={{
          fontFamily: "'AlQalam Ishtiaq', serif",
          fontSize: "36px",
          fontWeight: "700",
          color: active ? "#b35f00" : "#2a2a2a",
          textAlign: "center",
          padding: "25px 20px",
          background: active
            ? "linear-gradient(135deg, #f8d6b0, #ffeedd)"
            : "linear-gradient(135deg, #f5e0c3, #f7f0e9)",
          borderBottom: "2px solid #e0d5c4",
          borderRadius: "0 0 25px 25px",
          boxShadow: active
            ? "0 12px 25px rgba(0,0,0,0.25)"
            : "0 6px 12px rgba(0,0,0,0.15)",
          transition: "all 0.5s ease-in-out",
          cursor: "pointer",
          position: "relative",
          userSelect: "none",
          textShadow: "1px 1px 2px rgba(0,0,0,0.2)"
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