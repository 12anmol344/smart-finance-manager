import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [loading, setLoading] =
    useState(false);
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMsg("");

    try {
      await axios.post(
        "https://smart-finance-manager-3bgu.onrender.com/api/users/register",
        {
          name,
          email,
          password
        }
      );

      setMsg("✅ Account Created Successfully");

      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (error) {
      setMsg("❌ Registration Failed");
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.blur1}></div>
      <div style={styles.blur2}></div>

      <div style={styles.card}>
        <h1 style={styles.title}>
          Create Account ✨
        </h1>

        <p style={styles.sub}>
          Join Smart Finance Manager
        </p>

        {msg && (
          <div
            style={{
              ...styles.message,
              background: msg.includes("✅")
                ? "rgba(16,185,129,0.18)"
                : "rgba(239,68,68,0.18)"
            }}
          >
            {msg}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={styles.input}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={styles.input}
            required
          />

          <div style={{ position: "relative" }}>
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Create Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              style={styles.input}
              required
            />

            <span
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              style={styles.eye}
            >
              {showPassword
                ? "🙈"
                : "👁️"}
            </span>
          </div>

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Register"}
          </button>
        </form>

        <p style={styles.bottom}>
          Already have account?{" "}
          <Link
            to="/"
            style={styles.link}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg,#0f172a,#1e293b,#111827)",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Arial"
  },

  blur1: {
    position: "absolute",
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    background: "#8B5CF6",
    filter: "blur(90px)",
    top: "10%",
    left: "10%",
    opacity: 0.45
  },

  blur2: {
    position: "absolute",
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    background: "#10B981",
    filter: "blur(90px)",
    bottom: "10%",
    right: "10%",
    opacity: 0.45
  },

  card: {
    width: "420px",
    padding: "35px",
    borderRadius: "22px",
    background:
      "rgba(255,255,255,0.12)",
    border:
      "1px solid rgba(255,255,255,0.18)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter:
      "blur(18px)",
    boxShadow:
      "0 15px 35px rgba(0,0,0,0.25)",
    color: "white",
    zIndex: 10
  },

  title: {
    margin: 0,
    fontSize: "30px",
    textAlign: "center"
  },

  sub: {
    textAlign: "center",
    color: "#d1d5db",
    marginTop: "8px",
    marginBottom: "25px"
  },

  message: {
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "15px",
    textAlign: "center",
    fontSize: "14px"
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "12px",
    border:
      "1px solid rgba(255,255,255,0.18)",
    background:
      "rgba(255,255,255,0.08)",
    color: "white",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box"
  },

  eye: {
    position: "absolute",
    right: "14px",
    top: "13px",
    cursor: "pointer"
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg,#8B5CF6,#7C3AED)",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  bottom: {
    textAlign: "center",
    marginTop: "18px",
    color: "#e5e7eb"
  },

  link: {
    color: "#c4b5fd",
    textDecoration: "none",
    fontWeight: "bold"
  }
};

export default Register;