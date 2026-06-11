import React, { useState } from "react";

function TransactionCard({
  item,
  darkMode,
  editTransaction,
  deleteTransaction
}) {

  const [isDeleting, setIsDeleting] =
    useState(false);

  // ANIMATION
  const animationStyle = `

    @keyframes fadeInCard {

      from {
        opacity: 0;
        transform: translateY(25px);
      }

      to {
        opacity: 1;
        transform: translateY(0px);
      }
    }

    @keyframes deleteCard {

      0% {
        opacity: 1;
        transform: scale(1);
      }

      50% {
        opacity: 0.5;
        transform: scale(0.95);
      }

      100% {
        opacity: 0;
        transform: translateX(120px);
      }
    }
  `;

  const categoryIcons = {

    Food: "🍔",
    Shopping: "🛒",
    Travel: "🚕",
    Salary: "💼",
    Bills: "📄",
    Entertainment: "🎮",
    Health: "🏥",
    Education: "📚",
    Other: "💰"
  };

  // DELETE HANDLER
  const handleDelete = () => {

    setIsDeleting(true);

    setTimeout(() => {

      deleteTransaction(item._id);

    }, 500);
  };

  return (

    <>

      <style>{animationStyle}</style>

      <div

        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "translateY(-8px)";
        }}

        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "translateY(0px)";
        }}

        style={{
          background:
            darkMode
              ? "#1E293B"
              : "white",

          padding: "18px",
          borderRadius: "14px",
          marginTop: "12px",

          display: "flex",

flexDirection:
  window.innerWidth <= 768
    ? "column"
    : "row",

justifyContent: "space-between",

alignItems:
  window.innerWidth <= 768
    ? "flex-start"
    : "center",

gap:
  window.innerWidth <= 768
    ? "10px"
    : "0",

          boxShadow:
            "0 4px 10px rgba(0,0,0,0.1)",

          transition: "0.3s",

          cursor: "pointer",

          animation: isDeleting
            ? "deleteCard 0.5s forwards"
            : "fadeInCard 0.6s ease"
        }}
      >

        <div>

          <h3>

            {categoryIcons[
              item.category
            ] || "💰"}

            {" "}

            {item.category}

          </h3>

          <p>
            {item.type}
            {" - ₹"}
            {item.amount}
          </p>

        </div>

        <div
  style={{
    display: "flex",
    gap: "10px",
    width:
      window.innerWidth <= 768
        ? "100%"
        : "auto"
  }}
>

          <button

            style={editBtn}

            onMouseEnter={(e) => {
              e.currentTarget.style.opacity =
                "0.8";
            }}

            onMouseLeave={(e) => {
              e.currentTarget.style.opacity =
                "1";
            }}

            onClick={() =>
              editTransaction(item)
            }
          >
            Edit
          </button>

          <button

            style={deleteBtn}

            onMouseEnter={(e) => {
              e.currentTarget.style.opacity =
                "0.8";
            }}

            onMouseLeave={(e) => {
              e.currentTarget.style.opacity =
                "1";
            }}

            onClick={handleDelete}
          >
            Delete
          </button>

        </div>

      </div>

    </>
  );
}

const editBtn = {
  width:
  window.innerWidth <= 768
    ? "50%"
    : "auto",
  background: "#10B981",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  marginRight: "8px",
  cursor: "pointer",
  transition: "0.3s"
};

const deleteBtn = {
  width:
  window.innerWidth <= 768
    ? "50%"
    : "auto",
  background: "#EF4444",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.3s"
};

export default TransactionCard;