import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

// COMPONENTS
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";

import SummaryCards from "../components/SummaryCards";
import ChartSection from "../components/ChartSection";
import BudgetSection from "../components/BudgetSection";
import TransactionCard from "../components/TransactionCard";

function Dashboard() {

  const navigate =
    useNavigate();

  // USER EMAIL
  const userEmail =
    localStorage.getItem(
      "userEmail"
    );

  // STATES
  const [
    transactions,
    setTransactions
  ] = useState([]);

  const [
    toast,
    setToast
  ] = useState("");

  const [
    darkMode,
    setDarkMode
  ] = useState(
    localStorage.getItem(
      "theme"
    ) === "dark"
  );

  // SEARCH + FILTER
  const [
    search,
    setSearch
  ] = useState("");

  const [
    filterType,
    setFilterType
  ] = useState("All");

  // USERWISE BUDGET
  const [
    budget,
    setBudget
  ] = useState("");

  // LOAD USER BUDGET
  useEffect(() => {

    if (userEmail) {

      const savedBudget =
        localStorage.getItem(
          `budget_${userEmail}`
        );

      if (savedBudget) {

        setBudget(
          savedBudget
        );

      }
    }

  }, [userEmail]);

  // FETCH TRANSACTIONS
  useEffect(() => {

    fetchTransactions();

  }, []);

  // SAVE THEME
  useEffect(() => {

    localStorage.setItem(
      "theme",
      darkMode
        ? "dark"
        : "light"
    );

  }, [darkMode]);

  // SAVE USERWISE BUDGET
  useEffect(() => {

    if (userEmail) {

      localStorage.setItem(
        `budget_${userEmail}`,
        budget
      );

    }

  }, [budget, userEmail]);

  // FETCH FUNCTION
  const fetchTransactions =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "https://smart-finance-manager-3bgu.onrender.com/api/transactions",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setTransactions(
          res.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  // TOAST
  const showToast =
    (msg) => {

      setToast(msg);

      setTimeout(() => {

        setToast("");

      }, 2500);
    };

  // LOGOUT
  const handleLogout =
    () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "userEmail"
      );

      navigate("/");

    };

  // DELETE
  const deleteTransaction =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.delete(
          `http://localhost:5000/api/transactions/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        fetchTransactions();

        showToast(
          "🗑 Deleted Successfully"
        );

      } catch {

        showToast(
          "❌ Delete Failed"
        );

      }
    };

  // EDIT
  const editTransaction =
    async (item) => {

      const newAmount =
        prompt(
          "Enter New Amount",
          item.amount
        );

      if (!newAmount)
        return;

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(
          `http://localhost:5000/api/transactions/${item._id}`,

          {
            ...item,
            amount:
              newAmount
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        fetchTransactions();

        showToast(
          "✏ Updated Successfully"
        );

      } catch {

        showToast(
          "❌ Update Failed"
        );

      }
    };

  // CALCULATIONS
  const totalIncome =
    transactions
      .filter(
        (t) =>
          t.type ===
          "Income"
      )
      .reduce(
        (a, t) =>
          a +
          Number(
            t.amount
          ),
        0
      );

  const totalExpense =
    transactions
      .filter(
        (t) =>
          t.type ===
          "Expense"
      )
      .reduce(
        (a, t) =>
          a +
          Number(
            t.amount
          ),
        0
      );

  const balance =
    totalIncome -
    totalExpense;

  // BUDGET ALERT
  useEffect(() => {

    if (

      budget &&

      Number(totalExpense) >
      Number(budget)

    ) {

      showToast(
        "⚠ Budget Limit Exceeded"
      );

      const audio =
        new Audio(
          "/message.mp3.mp3"
        );

      audio.play();

    }

  }, [
    totalExpense,
    budget
  ]);

  return (

    <div
  style={{
    display: "flex",
    flexDirection:
      window.innerWidth <= 768
        ? "column"
        : "row",

    minHeight: "100vh",

    marginLeft:
      window.innerWidth <= 768
        ? "0"
        : "250px"
  }}
>

      {/* TOAST */}
      <Toast
        toast={toast}
      />

      {/* SIDEBAR */}
      <Sidebar
        navigate={
          navigate
        }
        darkMode={
          darkMode
        }
        setDarkMode={
          setDarkMode
        }
        handleLogout={
          handleLogout
        }
      />

      {/* MAIN */}
      <div
        style={{
          flex: 1,
          width: "100%",
overflowX: "hidden",
          padding:
  window.innerWidth <= 768
    ? "15px"
    : "30px",

          background:
            darkMode
              ? "#0F172A"
              : "linear-gradient(135deg,#dbeafe,#f8fafc,#e0f2fe)",

          color:
            darkMode
              ? "white"
              : "black"
        }}
      >

        <h1
  style={{
    fontSize:
      window.innerWidth <= 768
        ? "26px"
        : "40px"
  }}
>
  Track • Save • Grow ⚡
</h1>
 
                {/* CHARTS */}
        <ChartSection
          totalIncome={
            totalIncome
          }

          totalExpense={
            totalExpense
          }
          budget={budget}  

          darkMode={
            darkMode
          }

          transactions={
            transactions
          }
        />

        {/* SUMMARY */}
        <SummaryCards
          totalIncome={
            totalIncome
          }
          totalExpense={
            totalExpense
          }
          balance={
            balance
          }
        />





                {/* BUDGET */}
        <BudgetSection
          budget={budget}
          setBudget={
            setBudget
          }
          totalExpense={
            totalExpense
          }
          darkMode={
            darkMode
          }
        />

        {/* TRANSACTIONS */}
        <h2
          style={{
            marginTop:
              "30px"
          }}
        >
          Transactions
        </h2>

        {/* SEARCH + FILTER */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexDirection:
  window.innerWidth <= 768
    ? "column"
    : "row",
            marginTop: "20px",
            marginBottom: "20px",
            flexWrap: "wrap"
          }}
        >

          <input
            type="text"
            placeholder="Search Category..."
            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            style={{
              padding: "12px",
              borderRadius:
                "10px",
              border: "none",
              width:
  window.innerWidth <= 768
    ? "100%"
    : "250px"
            }}
          />

          <select
            value={filterType}

            onChange={(e) =>
              setFilterType(
                e.target.value
              )
            }

            style={{
              padding: "12px",
              borderRadius:
                "10px",
              border: "none",
              width:
    window.innerWidth <= 768
      ? "100%"
      : "auto"
            }}
          >

            <option>
              All
            </option>

            <option>
              Income
            </option>

            <option>
              Expense
            </option>

          </select>

        </div>

        {/* FILTERED TRANSACTIONS */}
        {transactions

          .filter((item) => {

            const matchesSearch =
              item.category
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                );

            const matchesType =
              filterType === "All"
                ? true
                : item.type ===
                  filterType;

            return (
              matchesSearch &&
              matchesType
            );
          })

          .map(
            (item) => (

              <TransactionCard
                key={
                  item._id
                }

                item={item}

                darkMode={
                  darkMode
                }

                editTransaction={
                  editTransaction
                }

                deleteTransaction={
                  deleteTransaction
                }
              />

            )
          )}

      </div>

    </div>
  );
}

export default Dashboard;