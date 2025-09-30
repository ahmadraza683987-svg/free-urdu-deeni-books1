import "../styles/globals.css";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  return (
    <div>
      {/* Professional Stylish Header */}
      <header
        onClick={toggleActive}
        style={{
          background: active
            ? "linear-gradient(135deg, #f8d6b0, #ffeedd)"
            : "linear-gradient(135deg, #f5e0c3, #f7f0e9)",
          padding: "25px 20px",
          textAlign: "center",
          fontSize: "34px",
          fontWeight: "bold",
          color: active ? "#b35f00" : "#2a2a2a",
          fontFamily: "'Noto Nastaliq Urdu', serif",
          boxShadow: active
            ? "0 12px 20px rgba(0,0,0,0.3)"
            : "0 6px 12px rgba(0,0,0,0.15)",
          borderBottom: "2px solid #e0d5c4",
          borderRadius: "0 0 20px 20px",
          transition: "all 0.4s ease-in-out",
          cursor: "pointer",
          userSelect: "none",
          position: "relative",
          textShadow: "1px 1px 2px rgba(0,0,0,0.2)"
        }}
      >
        فری دینی اردو کتابیں
        {/* Underline animation */}
        <span
          style={{
            position: "absolute",
            bottom: "5px",
            left: "50%",
            transform: "translateX(-50%)",
            width: active ? "80%" : "0%",
            height: "4px",
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