import React from "react";

function Message({ from, text }) {
  return (
    <div style={{ textAlign: from === "ia" ? "left" : "right", margin: "8px 0" }}>
      <span
        style={{
          background: from === "ia" ? "#e0e0e0" : "#1976d2",
          color: from === "ia" ? "#222" : "#fff",
          padding: "8px 14px",
          borderRadius: "16px",
          display: "inline-block",
          maxWidth: "70%"
        }}
      >
        {text}
      </span>
    </div>
  );
}

export default Message;