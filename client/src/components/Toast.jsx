import React from "react";

function Toast({ toast }) {

  if (!toast) return null;

  return (

    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: "#111827",
        color: "white",
        padding: "14px 18px",
        borderRadius: "12px",
        zIndex: 999,
        boxShadow:
          "0 5px 15px rgba(0,0,0,0.3)"
      }}
    >

      {toast}

    </div>
  );
}

export default Toast;