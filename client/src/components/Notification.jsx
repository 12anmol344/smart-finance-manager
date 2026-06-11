import React from "react";

function Notification({ text }) {

  if (!text) return null;

  return (

    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",

        background:
          "linear-gradient(135deg,#3B82F6,#2563EB)",

        color: "white",

        padding: "14px 22px",

        borderRadius: "14px",

        boxShadow:
          "0 10px 25px rgba(0,0,0,0.3)",

        zIndex: 999,

        fontWeight: "bold"
      }}
    >
      🔔 {text}
    </div>
  );
}

export default Notification;