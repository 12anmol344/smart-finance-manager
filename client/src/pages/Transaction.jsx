

// Transaction.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Transaction() {
  const navigate = useNavigate();

  const [type, setType] = useState("Income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMsg("");

    try {

      // GET USER TOKEN
      const token = localStorage.getItem("token");

      await axios.post(
        "https://smart-finance-manager-3bgu.onrender.com/api/transactions",
        {
          type,
          amount,
          category
        },

        // SEND TOKEN
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMsg("✅ Transaction Added");

      setAmount("");
      setCategory("");
      setType("Income");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);

    } catch (error) {

      setMsg("❌ Failed to Add");

    }

    setLoading(false);
  };

const animationStyle = `
@keyframes popupCard{
  from{
    opacity:0;
    transform:translateY(60px) scale(.85);
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

@keyframes glow{
  0%{box-shadow:0 0 0 rgba(16,185,129,.4);}
  50%{box-shadow:0 0 20px rgba(16,185,129,.6);}
  100%{box-shadow:0 0 0 rgba(16,185,129,.4);}
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
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateY(-10px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0px)";
  }}
>

  


        <p style={styles.sub}>
          Manage your income & expenses
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

        <form onSubmit={handleSubmit}>

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
            style={styles.input}
          >
            <option>Income</option>
            <option>Expense</option>
          </select>

          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            style={styles.input}
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            style={styles.input}
            required
          />

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
   {loading ? "Saving..." : "Save Transaction"}
  </button>

        </form>

        <button
  onClick={() => navigate("/dashboard")}
  style={styles.back}
  onMouseEnter={(e)=>{
    e.currentTarget.style.background =
      "rgba(255,255,255,0.15)";
  }}
  onMouseLeave={(e)=>{
    e.currentTarget.style.background =
      "rgba(255,255,255,0.08)";
  }}
>
          ← Back to Dashboard
        </button>

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
  opacity: 0.45,
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
  width: "430px",
  padding: "35px",
  borderRadius: "22px",

  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(20px)",

  animation: "popupCard .7s ease-out"
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
    textAlign: "center"
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

button: {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "12px",
  background:
    "linear-gradient(135deg,#10B981,#059669)",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: ".3s"
},

back: {
  width: "100%",
  padding: "12px",
  marginTop: "12px",
  border: "none",
  borderRadius: "12px",
  background:
    "rgba(255,255,255,0.08)",
  color: "white",
  cursor: "pointer",
  transition: ".3s"
},
};

export default Transaction;