import React from "react";

function SummaryCards({
  totalIncome,
  totalExpense,
  balance
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
  window.innerWidth <= 768
    ? "1fr"
    : "repeat(auto-fit,minmax(220px,1fr))",
        gap: "18px",
        marginTop: "20px"
      }}
    >

      {/* INCOME */}
      <div
        style={green}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "translateY(-8px) scale(1.03)";
          e.currentTarget.style.boxShadow =
            "0 20px 40px rgba(16,185,129,.45)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow =
            "0 10px 25px rgba(0,0,0,.15)";
        }}
      >
        <h3>💚 Income</h3>

        <h2>
          ₹ {totalIncome}
        </h2>
      </div>

      {/* EXPENSE */}
      <div
        style={red}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "translateY(-8px) scale(1.03)";
          e.currentTarget.style.boxShadow =
            "0 20px 40px rgba(239,68,68,.45)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow =
            "0 10px 25px rgba(0,0,0,.15)";
        }}
      >
        <h3>❤️ Expense</h3>

        <h2  style={{
    fontSize:
      window.innerWidth <= 768
        ? "20px"
        : "28px"
  }}>
          ₹ {totalExpense}
        </h2>
      </div>

      {/* BALANCE */}
      <div
        style={blue}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "translateY(-8px) scale(1.03)";
          e.currentTarget.style.boxShadow =
            "0 20px 40px rgba(59,130,246,.45)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow =
            "0 10px 25px rgba(0,0,0,.15)";
        }}
      >
        <h3  style={{
    fontSize:
      window.innerWidth <= 768
        ? "20px"
        : "28px"
  }}>💰 Balance</h3>

        <h2
  style={{
    fontSize:
      window.innerWidth <= 768
        ? "20px"
        : "28px"
  }}
>
  ₹ {totalIncome}
</h2>
      </div>

    </div>
  );
}

const commonCard = {
  color: "white",
  padding:
  window.innerWidth <= 768
    ? "16px"
    : "22px",
  borderRadius: "18px",
  transition: "all .3s ease",
  cursor: "pointer",
  boxShadow:
    "0 10px 25px rgba(0,0,0,.15)"
};

const green = {
  ...commonCard,
  background:
    "linear-gradient(135deg,#10B981,#059669)"
};

const red = {
  ...commonCard,
  background:
    "linear-gradient(135deg,#EF4444,#DC2626)"
};

const blue = {
  ...commonCard,
  background:
    "linear-gradient(135deg,#3B82F6,#2563EB)"
};

export default SummaryCards;