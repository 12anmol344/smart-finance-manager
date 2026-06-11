import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 25px",
        background: "#111827",
        color: "white"
      }}
    >
      <h2>💰 Finance App</h2>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/dashboard" style={{ color: "white" }}>
          Dashboard
        </Link>

        <Link to="/transaction" style={{ color: "white" }}>
          Transaction
        </Link>

        <button
          onClick={handleLogout}
          style={{
            background: "red",
            border: "none",
            color: "white",
            padding: "8px 12px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;