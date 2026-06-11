import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await axios.post(
        "https://smart-finance-manager-3bgu.onrender.com/api/users/login",
        { email, password }
      );


      localStorage.setItem(
  "token",
  res.data.token
);

localStorage.setItem(
  "userEmail",
  res.data.user.email
);

localStorage.setItem(
  "userName",
  res.data.user.name
);

localStorage.setItem(
  "joinedDate",
  new Date().toDateString()
);
//       localStorage.setItem(
//   "user",
//   JSON.stringify(res.data.user)
// );

      setMsg("✅ Login Successful");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setMsg("❌ Invalid Email or Password");
    }

    setLoading(false);
  };
  const animationStyle = `
@keyframes popupCard{
  from{
    opacity:0;
    transform:translateY(50px) scale(.9);
  }
  to{
    opacity:1;
    transform:translateY(0) scale(1);
  }
}

@keyframes floating{
  0%{transform:translateY(0);}
  50%{transform:translateY(-25px);}
  100%{transform:translateY(0);}
}
`;

  return (
      <>
    <style>{animationStyle}</style>
    <div style={styles.page}>
      <div style={styles.blur1}></div>
      <div style={styles.blur2}></div>

      <div
  style={styles.card}
  onMouseEnter={(e)=>{
    e.currentTarget.style.transform =
      "translateY(-10px)";
  }}
  onMouseLeave={(e)=>{
    e.currentTarget.style.transform =
      "translateY(0px)";
  }}
>
        <h1 style={styles.title}>Welcome Back 👋</h1>
        <p style={styles.sub}>Login to Smart Finance Manager</p>

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

        <form onSubmit={handleLogin}>
          <input
  type="email"
  placeholder="Enter Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}

  onFocus={(e) => {
    e.target.style.border =
      "1px solid #3B82F6";
    e.target.style.boxShadow =
      "0 0 15px rgba(59,130,246,.5)";
  }}

  onBlur={(e) => {
    e.target.style.border =
      "1px solid rgba(255,255,255,0.18)";
    e.target.style.boxShadow = "none";
  }}

  style={styles.input}
  required
/>

          <div style={{ position: "relative" }}>
            <input
  type={showPassword ? "text" : "password"}
  placeholder="Enter Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}

  onFocus={(e) => {
    e.target.style.border =
      "1px solid #3B82F6";
    e.target.style.boxShadow =
      "0 0 15px rgba(59,130,246,.5)";
  }}

  onBlur={(e) => {
    e.target.style.border =
      "1px solid rgba(255,255,255,0.18)";
    e.target.style.boxShadow = "none";
  }}

  style={styles.input}
  required
/>

            <span
              onClick={() =>
                setShowPassword(!showPassword)
              }
              style={styles.eye}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button
  type="submit"
  style={styles.button}
  disabled={loading}
  onMouseEnter={(e)=>{
    e.currentTarget.style.transform =
      "scale(1.03)";
  }}
  onMouseLeave={(e)=>{
    e.currentTarget.style.transform =
      "scale(1)";
  }}
>

            {loading ? "Please wait..." : "Login"}
          </button>
        </form>

        <p style={styles.bottom}>
          Don’t have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
    </>
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
  background: "#3B82F6",
  filter: "blur(90px)",
  top: "10%",
  left: "10%",
  opacity: 0.5,
  animation: "floating 6s ease-in-out infinite"
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
  opacity: 0.45,
  animation: "floating 8s ease-in-out infinite"
},
  card: {
    width: "400px",
    padding: "35px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.18)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    boxShadow:
      "0 15px 35px rgba(0,0,0,0.25)",
    color: "white",
    zIndex: 10,
    animation: "popupCard .7s ease-out",
transition: ".3s"
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
    fontSize: "14px",
    textAlign: "center"
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box"
  },

  eye: {
    position: "absolute",
    right: "14px",
    top: "13px",
    cursor: "pointer",
    userSelect: "none"
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg,#3B82F6,#2563EB)",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "5px",
    transition: ".3s"
  },

  bottom: {
    textAlign: "center",
    marginTop: "18px",
    color: "#e5e7eb"
  },

  link: {
    color: "#93c5fd",
    textDecoration: "none",
    fontWeight: "bold"
  }
};

export default Login;