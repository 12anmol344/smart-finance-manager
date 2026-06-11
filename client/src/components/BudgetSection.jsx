// BudgetSection.jsx

import React from "react";

function BudgetSection({
  budget,
  setBudget,
  totalExpense,
  darkMode
}) {

  // REMAINING BUDGET
  const remainBudget =
    Number(budget) - Number(totalExpense);

  // USED %
  const usedPercent =
    Number(budget) > 0
      ? Math.min(
          (Number(totalExpense) /
            Number(budget)) * 100,
          100
        )
      : 0;

  return (
    <div
      style={{
        background: darkMode
          ? "#1E293B"
          : "white",

        padding: "20px",

        borderRadius: "16px",

        marginTop: "20px",

        boxShadow:
          "0 4px 10px rgba(0,0,0,0.08)"
      }}
    >
      <h2>
        Monthly Budget
      </h2>

      <input
        type="number"
        value={budget}
        onChange={(e) =>
          setBudget(
            e.target.value
          )
        }
        placeholder="Enter Budget"
        style={{
          padding: "12px",
          width: "220px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          marginTop: "10px"
        }}
      />

      <h3
        style={{
          marginTop: "20px"
        }}
      >
        Budget: ₹{budget}
      </h3>

      <h3>
        Expense: ₹{totalExpense}
      </h3>

      <h3>
        Remaining: ₹{remainBudget}
      </h3>

      {/* PROGRESS BAR */}
      <div
        style={{
          width: "100%",
          height: "14px",
          background: "#d1d5db",
          borderRadius: "10px",
          overflow: "hidden",
          marginTop: "15px"
        }}
      >
        <div
          style={{
            width:
              usedPercent + "%",

            height: "100%",

            transition:
              "0.4s",

            background:
              usedPercent >= 100
                ? "#EF4444"
                : usedPercent >= 80
                ? "#F59E0B"
                : "#10B981"
          }}
        />
      </div>

      <p
        style={{
          marginTop: "10px",
          fontWeight: "bold"
        }}
      >
        {usedPercent.toFixed(0)}%
        Budget Used
      </p>
    </div>
  );
}

export default BudgetSection;