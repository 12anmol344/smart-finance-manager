import React from "react";
import { useLocation } from "react-router-dom";

function Sidebar({
  navigate,
  darkMode,
  setDarkMode,
  handleLogout
}) {
  const location = useLocation();
  const animationStyle = `
@keyframes slideIn {
  from{
    transform: translateX(-60px);
    opacity: 0;
  }
  to{
    transform: translateX(0);
    opacity: 1;
  }
}
`;

  return (
      <>
    <style>{animationStyle}</style>

   <div
   className="sidebar"
  style={{
    
    width:
  window.innerWidth <= 768
    ? "100%"
    : "250px",

   
      background: darkMode
  ? "linear-gradient(180deg,#0F172A,#111827,#1E293B)"
  : "linear-gradient(180deg,#FFFFFF,#F8FAFC,#E2E8F0)",

color: darkMode ? "white" : "#0F172A",

    padding:
  window.innerWidth <= 768
    ? "15px"
    : "20px",


    display: "flex",

    flexDirection: "column",

    gap: "25px",

position:
  window.innerWidth <= 768
    ? "relative"
    : "fixed",

left: 0,
top: 0,

height:
  window.innerWidth <= 768
    ? "auto"
    : "100vh",

    overflowY: "auto",

    backdropFilter: "blur(15px)",

    boxShadow:
      "8px 0 35px rgba(0,0,0,0.35)",

    borderRight:
      "1px solid rgba(255,255,255,0.08)",

    transition: "0.3s ease",

    zIndex: 100
  }}
>

     {/* LOGO */}
<div
  style={{
    marginBottom: "25px",
    textAlign: "center",
    paddingBottom: "20px",
    borderBottom:
      "1px solid rgba(255,255,255,0.08)"
  }}
>
  <div
    style={{
      width: window.innerWidth <= 768 ? "55px" : "70px",
height: window.innerWidth <= 768 ? "55px" : "70px",
      margin: "0 auto 12px",
      borderRadius: "50%",
      background:
        "linear-gradient(135deg,#3B82F6,#10B981)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize:
  window.innerWidth <= 768
    ? "22px"
    : "30px",
      boxShadow:
        "0 0 25px rgba(59,130,246,.45)"
    }}
  >
    💰 
  </div>

  <h1
    style={{
      margin: 0,
      fontSize: window.innerWidth <= 768 ? "22px" : "30px",
      fontWeight: "bold",
      letterSpacing: "1px",
      textShadow:
        "0 0 15px rgba(59,130,246,.4)"
    }}
  >
    Smart Finance
  </h1>

  <p
  style={{
    marginTop: "10px",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "2px",

    background:
      "linear-gradient(90deg,#3B82F6,#10B981,#F59E0B)",

    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }}
>
  Track • Save • Grow 🚀
</p>
</div>

      {/* BUTTONS */}
      <button
  style={{
    ...btn,
    background:
      location.pathname === "/dashboard"
        ? "linear-gradient(135deg,#3B82F6,#2563EB)"
        : "rgba(255,255,255,0.08)"
  }}
  onClick={() => navigate("/dashboard")}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateX(8px) scale(1.03)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateX(0px) scale(1)";
  }}
>
  📊 Dashboard
</button>

<button
  style={{
    ...btn,
    background:
      location.pathname === "/transaction"
        ? "linear-gradient(135deg,#10B981,#059669)"
        : "rgba(255,255,255,0.08)"
  }}
  onClick={() => navigate("/transaction")}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateX(8px) scale(1.03)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateX(0px) scale(1)";
  }}
>
  ➕ Add Transaction
</button>

<button
  style={{
    ...btn,
    background:
      location.pathname === "/profile"
        ? "linear-gradient(135deg,#8B5CF6,#7C3AED)"
        : "rgba(255,255,255,0.08)"
  }}
  onClick={() => navigate("/profile")}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateX(8px) scale(1.03)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateX(0px) scale(1)";
  }}
>
  👤 Profile
</button>

<button
  style={{
    ...btn,
    background:
      location.pathname === "/reports"
        ? "linear-gradient(135deg,#F59E0B,#D97706)"
        : "rgba(255,255,255,0.08)"
  }}
  onClick={() => navigate("/reports")}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateX(8px) scale(1.03)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateX(0px) scale(1)";
  }}
>
  📈 Reports
</button>

<button
  style={btn}
  onClick={() => setDarkMode(!darkMode)}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateX(8px) scale(1.03)";
    e.currentTarget.style.background =
      "rgba(99,102,241,0.25)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateX(0px) scale(1)";
    e.currentTarget.style.background =
      "rgba(255,255,255,0.08)";
  }}
>
  {darkMode
    ? "☀ Light Mode"
    : "🌙 Dark Mode"}
</button>

<button
  style={logoutBtn}
  onClick={handleLogout}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "scale(1.05)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "scale(1)";
  }}
>
  🚪 Logout
</button>
      </div>
      </>
  );
}

const btn = {

  padding:
  window.innerWidth <= 768
    ? "12px"
    : "14px",
  border: "none",
  borderRadius: "16px",

  background: "rgba(255,255,255,0.08)",

  color: "inherit",

  cursor: "pointer",
  fontSize: window.innerWidth <= 768 ? "13px" : "15px",
  fontWeight: "bold",
  textAlign: "left",

  transition: "0.3s",

  backdropFilter: "blur(10px)",

  boxShadow:
    "0 5px 15px rgba(0,0,0,0.15)"
};

const logoutBtn = {

  padding: "14px",

  border: "none",

  borderRadius: "16px",

  background:
    "linear-gradient(135deg,#EF4444,#DC2626)",

  color: "white",

  cursor: "pointer",

  marginTop: "auto",

  fontWeight: "bold",

  fontSize: "15px",

  boxShadow:
    "0 10px 25px rgba(239,68,68,0.35)"
};

export default Sidebar;