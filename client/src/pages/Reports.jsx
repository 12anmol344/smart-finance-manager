import React, { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";


import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

function Reports() {

  const [transactions, setTransactions] = useState([]);

  const [darkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [achievementIndex, setAchievementIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);
  useEffect(() => {

  const interval = setInterval(() => {

    setAchievementIndex(prev =>
      (prev + 1) % 3
    );

  }, 3000);

  return () => clearInterval(interval);
}, []);

  const fetchTransactions = async () => {
    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "https://smart-finance-manager-3bgu.onrender.com/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTransactions(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // CALCULATIONS
  // =========================

  const totalIncome = transactions
    .filter(t => t.type === "Income")
    .reduce((a, t) => a + Number(t.amount), 0);

  const totalExpense = transactions
    .filter(t => t.type === "Expense")
    .reduce((a, t) => a + Number(t.amount), 0);

  const balance =
    totalIncome - totalExpense;

  const savingsRate =
    totalIncome > 0
      ? (
          (balance / totalIncome) *
          100
        ).toFixed(1)
      : 0;

  const healthScore =
    Math.min(
      100,
      Math.max(
        0,
        Math.round(
          50 + Number(savingsRate)
        )
      )
    );
    const [animatedScore, setAnimatedScore] = useState(0);

useEffect(() => {
  setAnimatedScore(0);

  let current = 0;

  const interval = setInterval(() => {
    current++;

    setAnimatedScore(current);

    if (current >= healthScore) {
      clearInterval(interval);
    }
  }, 25);

  return () => clearInterval(interval);
}, [healthScore]);

  // =========================
  // TOP CATEGORY
  // =========================

  const categoryTotals = {};

  transactions
    .filter(t => t.type === "Expense")
    .forEach(t => {

      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0)
        + Number(t.amount);

    });

  const topCategory =
    Object.keys(categoryTotals).length

      ? Object.entries(categoryTotals)
          .sort((a, b) => b[1] - a[1])[0]

      : ["None", 0];

  // =========================
  // CHART DATA
  // =========================

  const pieData = [
    {
      name: "Income",
      value: totalIncome
    },
    {
      name: "Expense",
      value: totalExpense
    }
  ];

  const barData = [
    {
      name: "Income",
      amount: totalIncome
    },
    {
      name: "Expense",
      amount: totalExpense
    },
    {
      name: "Balance",
      amount: balance
    },
    {
      name: "Savings Rate",
      amount: Number(savingsRate)
    }
  ];

  const COLORS = [
    "#10B981",
    "#EF4444"
  ];

  // =========================
  // ANIMATIONS
  // =========================

  const animationStyle = `



  @keyframes fadeIn{
    from{
      opacity:0;
      transform:translateY(40px);
    }
    to{
      opacity:1;
      transform:translateY(0);
    }
  }

  @keyframes floating{
    0%{
      transform:translateY(0px);
    }
    50%{
      transform:translateY(-25px);
    }
    100%{
      transform:translateY(0px);
    }
  }

  @keyframes glow{
    0%{
      box-shadow:0 0 0px rgba(59,130,246,.4);
    }
    50%{
      box-shadow:0 0 25px rgba(59,130,246,.7);
    }
    100%{
      box-shadow:0 0 0px rgba(59,130,246,.4);
    }
  }
      @keyframes gradientMove{
0%{background-position:0%}
50%{background-position:100%}
100%{background-position:0%}
}

@keyframes chartGlow{
  0%{
    box-shadow:0 0 0px rgba(16,185,129,.2);
  }

  50%{
    box-shadow:0 0 30px rgba(16,185,129,.4);
  }

  100%{
    box-shadow:0 0 0px rgba(16,185,129,.2);
  }
}

  `;

  const cardStyle = {

    background: darkMode
      ? "rgba(30,41,59,.75)"
      : "rgba(255,255,255,.75)",

    backdropFilter: "blur(18px)",
    borderRadius: "22px",
    padding: "22px",
    border: "1px solid rgba(255,255,255,.15)",
    boxShadow: "0 15px 35px rgba(0,0,0,.15)",
    transition: ".3s",

    animation: "fadeIn .7s ease"
  };

   return (
    <>
      <style>{animationStyle}</style>

      <div
        style={{
          minHeight: "100vh",
          padding: "30px",
          background: darkMode
            ? "#0F172A"
            : "linear-gradient(135deg,#dbeafe,#f8fafc,#e0f2fe)",
          color: darkMode ? "white" : "black",
          position: "relative",
          overflowX: "hidden"
          
        }}
      >

        {/* FLOATING BLOBS */}
        <div style={{
  position:"absolute",
  top:"15%",
  right:"8%",
  fontSize:"60px",
  opacity:.15,
  animation:"floating 6s infinite"
}}>
💰
</div>

<div style={{
  position:"absolute",
  bottom:"20%",
  left:"8%",
  fontSize:"60px",
  opacity:.15,
  animation:"floating 8s infinite"
}}>
📈
</div>

<div style={{
  position:"absolute",
  top:"55%",
  right:"15%",
  fontSize:"60px",
  opacity:.15,
  animation:"floating 7s infinite"
}}>
🚀
</div>

        <h1
  style={{
    fontSize:
  window.innerWidth <= 768
    ? "30px"
    : "48px",
    fontWeight: "900",
    marginBottom: "25px",
    background:
      "linear-gradient(90deg,#3B82F6,#10B981,#F59E0B)",
    backgroundSize: "300%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "gradientMove 6s linear infinite"
  }}
>
  Financial Reports 📊
</h1>

        {/* SUMMARY CARDS */}
{/* TOTAL INCOME */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: "20px"
          }}
        >

          <div
  style={cardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateY(-8px) scale(1.02)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0px) scale(1)";
  }}
>
            <h3>Total Income 💚</h3>
            <h1>
              ₹
              <CountUp
                end={totalIncome}
                duration={2}
              />
            </h1>
            <div
  style={{
    height: "10px",
    background: "rgba(255,255,255,.15)",
    borderRadius: "20px",
    marginTop: "15px",
    overflow: "hidden"
  }}
>
  <div
    style={{
      width: `${Math.min(
        (totalIncome / 100000) * 100,
        100
      )}%`,
      height: "100%",
      background:
        "linear-gradient(90deg,#10B981,#34D399)",
      borderRadius: "20px",
      transition: "1.5s"
    }}
  />
</div>
<p
  style={{
    opacity: .9,
    fontSize: "16px",
    marginTop: "15px",
    marginBottom: "12px",
    lineHeight: "24px",
    fontWeight: "500"
  }}
>
  💸 Total earnings received
</p>

<h4
  style={{
    marginTop: "15px",
    marginBottom: "5px",
    color: "#A7F3D0",
    fontSize: "18px",
    fontWeight: "700"
  }}
>
  +12% from last month ↗
</h4>

          </div>


{/* TOTAL EXPENSE */}
          <div
  style={cardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateY(-8px) scale(1.02)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0px) scale(1)";
  }}
>
            <h3>Total Expense ❤️</h3>
            <h1>
              ₹
              <CountUp
                end={totalExpense}
                duration={2}
              />
            </h1>
            <div
  style={{
    height: "10px",
    background: "rgba(255,255,255,.15)",
    borderRadius: "20px",
    marginTop: "15px",
    overflow: "hidden"
  }}
>
  <div
    style={{
      width: `${Math.min(
        (totalExpense / 100000) * 100,
        100
      )}%`,
      height: "100%",
      background:
        "linear-gradient(90deg,#EF4444,#F87171)",
      borderRadius: "20px",
      transition: "1.5s"
    }}
  />
  
</div>
          </div>



{/* BALANCE */}
          <div
  style={cardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateY(-8px) scale(1.02)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0px) scale(1)";
  }}
>
            <h3>Balance 💰</h3>
            <h1>
              ₹
              <CountUp
                end={balance}
                duration={2}
              />
            </h1>
            <div
  style={{
    height: "10px",
    background: "rgba(255,255,255,.15)",
    borderRadius: "20px",
    marginTop: "15px",
    overflow: "hidden"
  }}
>
  <div
    style={{
      width: `${Math.min(
        (Math.abs(balance) / 100000) * 100,
        100
      )}%`,
      height: "100%",
      background:
        "linear-gradient(90deg,#3B82F6,#60A5FA)",
      borderRadius: "20px",
      transition: "1.5s"
    }}
  />
</div>
          </div>

          <div
            style={{
              ...cardStyle,
              animation:
                "glow 2s infinite"
            }}
          >
            <h3>Health Score 🚀</h3>
            <div
  style={{
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    background: `conic-gradient(
      #10B981 ${animatedScore}%,
      #334155 0
    )`,
    transition: "all 2.5s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "30px auto"
  }}
>
  <div
    style={{
      width: "130px",
      height: "130px",
      borderRadius: "50%",
      background: darkMode ? "#0F172A" : "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "28px",
      fontWeight: "bold"
    }}
  >
    {animatedScore}%
  </div>
</div>

            <h1>
              <CountUp
                end={healthScore}
                duration={2}
              />
              /100
            </h1>
          </div>

        </div>

        {/* EXTRA STATS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginTop: "25px"
          }}
        >

          <div
  style={cardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateY(-8px) scale(1.02)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0px) scale(1)";
  }}
>
  <h3>Savings Rate 📈</h3>

  <h2>{savingsRate}%</h2>

  <div
    style={{
      height: "10px",
      background: "#334155",
      borderRadius: "20px",
      overflow: "hidden",
      marginTop: "12px"
    }}
  >
    <div
      style={{
        width: `${Math.min(savingsRate, 100)}%`,
        height: "100%",
        background:
          "linear-gradient(90deg,#10B981,#3B82F6)"
      }}
    />
  </div>
</div>

          <div
  style={cardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateY(-8px) scale(1.02)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0px) scale(1)";
  }}
>
            <h3>Top Category 🔥</h3>
            <h2>{topCategory[0]}</h2>
            <p>₹ {topCategory[1]}</p>
          </div>

          <div
  style={cardStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateY(-8px) scale(1.02)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateY(0px) scale(1)";
  }}
>
            <h3>Status</h3>

            <h2>
              {balance >= 0
                ? "🟢 Profit"
                : "🔴 Loss"}
            </h2>
          </div>

        </div>

        <div
  style={{
    ...cardStyle,
    marginTop: "25px",
    textAlign: "center"
  }}
>
  <h2>Finance Health 💪</h2>

  <div
    style={{
      width: "180px",
      height: "180px",
      margin: "20px auto",
      borderRadius: "50%",
      background: `conic-gradient(
        #10B981 ${healthScore}%,
        #334155 0
      )`
    }}
  >
    <div
      style={{
        width: "130px",
        height: "130px",
        background:
          darkMode ? "#0F172A" : "#fff",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "25px auto",
        fontSize: "30px",
        fontWeight: "bold"
      }}
    >
      {healthScore}%
    </div>
  </div>
</div>



        {/* CHARTS */}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "25px",
            marginTop: "40px"
          }}
        >

          {/* PIE */}
          

          <div
  style={{
    ...cardStyle,
    width: window.innerWidth <= 768
  ? "100%"
  : "380px",

height: window.innerWidth <= 768
  ? "320px"
  : "380px",
    background:
      "linear-gradient(145deg,rgba(59,130,246,.15),rgba(16,185,129,.15))",
    border: "1px solid rgba(255,255,255,.15)"
  }}

  onMouseEnter={(e)=>{
    e.currentTarget.style.transform =
      "translateY(-10px) scale(1.03)";
      
  }}

  onMouseLeave={(e)=>{
    e.currentTarget.style.transform =
      "translateY(0px) scale(1)";
      
  }}
>

            <h2
  style={{
    textAlign:"center",
    marginBottom:"10px",
    transition: "all .4s ease",
cursor: "pointer",
  }}
>
🥧 Income vs Expense
</h2>

            <ResponsiveContainer>

              <PieChart>
                <Pie
  data={pieData}
  dataKey="value"
  innerRadius={55}
  outerRadius={115}
  paddingAngle={6}
  activeIndex={activeIndex}
  activeShape={(props) => (
    <g>
      <Sector
        {...props}
        outerRadius={props.outerRadius + 15}
      />
    </g>
  )}
  onMouseEnter={(_, index) =>
    setActiveIndex(index)
  }
  onMouseLeave={() =>
    setActiveIndex(null)
  }
  animationDuration={2500}
>
  {pieData.map((_, i) => (
    <Cell
      key={i}
      fill={COLORS[i]}
    />
  ))}
</Pie>
                <Tooltip />
                <Legend />
                </PieChart>

            </ResponsiveContainer>

          </div>

          {/* LINE */}

          <div
  style={{
    ...cardStyle,
    flex: 1,
    minWidth: window.innerWidth <= 768
  ? "100%"
  : "450px",

height: window.innerWidth <= 768
  ? "320px"
  : "380px",
    overflow: "hidden",

    background:
      "linear-gradient(145deg,rgba(16,185,129,.12),rgba(59,130,246,.12))",

    boxShadow:
      "0 20px 50px rgba(16,185,129,.20)",

    animation:
      "chartGlow 4s infinite",

    transition:
      "all .4s ease"
  }}

  onMouseEnter={(e)=>{
    e.currentTarget.style.transform =
      "translateY(-10px) scale(1.02)";
  }}

  onMouseLeave={(e)=>{
    e.currentTarget.style.transform =
      "translateY(0px) scale(1)";
  }}
>

  <h2
    style={{
      textAlign:"center",
      marginBottom:"10px"
    }}
  >
    📈 Financial Growth
  </h2>

  <ResponsiveContainer
    width="100%"
    height="100%"
  >

    <LineChart
      data={barData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 20
      }}
    >

      <defs>
        <linearGradient
          id="lineColor"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop
            offset="0%"
            stopColor="#3B82F6"
          />

          <stop
            offset="100%"
            stopColor="#10B981"
          />
        </linearGradient>
      </defs>

      <CartesianGrid
        strokeDasharray="4 4"
        opacity={0.15}
      />

      <XAxis dataKey="name" />

      <YAxis />

      <Tooltip
        contentStyle={{
          borderRadius: "12px",
          border: "none",
          background: "#1E293B",
          color: "white"
        }}
      />

      <Line
        type="natural"
        dataKey="amount"

        stroke="url(#lineColor)"

        strokeWidth={5}

        dot={{
          r: 7,
          fill: "#10B981",
          stroke: "#fff",
          strokeWidth: 2
        }}

        activeDot={{
          r: 14,
          fill: "#10B981",
          stroke: "#fff",
          strokeWidth: 4
        }}

        animationBegin={0}
        animationDuration={4000}
        animationEasing="ease-in-out"
      />

    </LineChart>

  </ResponsiveContainer>

</div>

        </div>

{/* saving rate */}
        <div
  style={{
    ...cardStyle,
    marginTop: "35px"
  }}
>
  <h2>AI Insights 🤖</h2>

  <p>
    📈 Savings Rate: {savingsRate}%
  </p>

  <p>
    🔥 Highest Expense Category:
    {" "}
    {topCategory[0]}
  </p>

  <p>
    💰 Current Balance:
    {" "}
    ₹ {balance}
  </p>

  <p>
    🚀 Financial Health:
    {
      healthScore > 70
        ? " Excellent"
        : healthScore > 50
        ? " Good"
        : " Needs Improvement"
    }
  </p>

</div>
</div>

        {/* ACHIEVEMENTS */}

        <div
          style={{
            ...cardStyle,
            marginTop: "40px"
          }}
        >



<div
style={{
  ...cardStyle,

  background: darkMode
    ? "linear-gradient(135deg,#1E293B,#0F172A)"
    : "linear-gradient(135deg,#FFFFFF,#F8FAFC)",

  color: darkMode ? "white" : "#0F172A",

  borderRadius: "22px",
  padding: "22px",
  textAlign: "center",
  marginTop: "10px",
  minHeight: "260px",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  position: "relative",
  overflow: "hidden",

  boxShadow:
    "0 20px 50px rgba(59,130,246,.25)",

  animation: "glow 3s infinite"
}}
>
  <h2
  style={{
    fontSize:
  window.innerWidth <= 768
    ? "24px"
    : "32px",
    fontWeight: "900",
    marginBottom: "15px",
    background:
      "linear-gradient(90deg,#3B82F6,#10B981,#F59E0B)",
    backgroundSize: "300%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "gradientMove 6s linear infinite"
  }}
>
  🏆 Achievements
</h2>

<div
  style={{
    width: "120px",
    height: "4px",
    borderRadius: "20px",
    background:
      "linear-gradient(90deg,#3B82F6,#10B981)",
    marginBottom: "20px"
  }}
/>

<div
  style={{
    position:"absolute",
    top:"-60px",
    right:"-60px",
    width:"180px",
    height:"180px",
    borderRadius:"50%",
    background:"#3B82F6",
    filter:"blur(90px)",
    opacity:.18
  }}
/>

<div
  style={{
    position:"absolute",
    bottom:"-60px",
    left:"-60px",
    width:"180px",
    height:"180px",
    borderRadius:"50%",
    background:"#10B981",
    filter:"blur(90px)",
    opacity:.18
  }}
/>

  {achievementIndex === 0 && (
    <>
      <h1
        style={{
          fontSize:"70px",
          animation:"floating 3s ease-in-out infinite"
        }}
      >
        💰
      </h1>

      <h2>Budget Master</h2>

      <span
        style={{
          background:"#F59E0B",
          color:"white",
          padding:"6px 15px",
          borderRadius:"20px",
          fontSize:"13px",
          fontWeight:"bold"
        }}
      >
        GOLD BADGE
      </span>

      <p
        style={{
          maxWidth:"500px",
          lineHeight:"28px",
          marginTop:"15px"
        }}
      >
        Successfully managing expenses and staying
        within budget limits every month.
      </p>

      <div
        style={{
          width:"75%",
          height:"12px",
          background: darkMode ? "#334155" : "#E2E8F0",
          borderRadius:"20px",
          marginTop:"20px",
          overflow:"hidden"
        }}
      >
        <div
          style={{
            width:"95%",
            height:"100%",
            background:
              "linear-gradient(90deg,#F59E0B,#FBBF24)"
          }}
        />
      </div>

      <p style={{marginTop:"10px"}}>
        95% Achievement Progress
      </p>

      <p style={{color:"#94A3B8"}}>
        🏆 Achievement Unlocked
      </p>
    </>
  )}

  {achievementIndex === 1 && (
    <>
      <h1
        style={{
          fontSize:"70px",
          animation:"floating 3s ease-in-out infinite"
        }}
      >
        🚀
      </h1>

      <h2>Smart Saver</h2>

      <span
        style={{
          background:"#94A3B8",
          color:"white",
          padding:"6px 15px",
          borderRadius:"20px",
          fontSize:"13px",
          fontWeight:"bold"
        }}
      >
        SILVER BADGE
      </span>

      <p
        style={{
          maxWidth:"500px",
          lineHeight:"28px",
          marginTop:"15px"
        }}
      >
        Great savings rate and strong financial
        discipline throughout the month.
      </p>

      <div
        style={{
          width:"75%",
          height:"12px",
          background: darkMode ? "#334155" : "#E2E8F0",
          borderRadius:"20px",
          marginTop:"20px",
          overflow:"hidden"
        }}
      >
        <div
          style={{
            width:"82%",
            height:"100%",
            background:
              "linear-gradient(90deg,#10B981,#3B82F6)"
          }}
        />
      </div>

      <p style={{marginTop:"10px"}}>
        82% Achievement Progress
      </p>

      <p style={{color:"#94A3B8"}}>
        ⭐ Consistent Saving Habit
      </p>
    </>
  )}

  {achievementIndex === 2 && (
    <>
      <h1
        style={{
          fontSize:"70px",
          animation:"floating 3s ease-in-out infinite"
        }}
      >
        📊
      </h1>

      <h2>Finance Pro</h2>

      <span
        style={{
          background:"#8B5CF6",
          color:"white",
          padding:"6px 15px",
          borderRadius:"20px",
          fontSize:"13px",
          fontWeight:"bold"
        }}
      >
        PLATINUM BADGE
      </span>

      <p
        style={{
          maxWidth:"500px",
          lineHeight:"28px",
          marginTop:"15px",
          opacity:.9,
          fontSize:"16px"
        }}
      >
        Successfully managing expenses and maintaining
        healthy spending habits throughout the month.
      </p>

      <div
        style={{
          width:"75%",
          height:"12px",
          background: darkMode ? "#334155" : "#E2E8F0",
          borderRadius:"20px",
          marginTop:"20px",
          overflow:"hidden"
        }}
      >
        <div
          style={{
            width:"100%",
            height:"100%",
            background:
              "linear-gradient(90deg,#8B5CF6,#3B82F6)"
          }}
        />
      </div>

      <p style={{marginTop:"10px"}}>
        100% Achievement Progress
      </p>

      <p style={{color:"#94A3B8"}}>
        👑 Financial Excellence Reached
      </p>
    </>
  )}

</div>
        {/* TRANSACTIONS */}

        <div
  style={{
    ...cardStyle,

    marginTop: "45px",

    padding: "25px",

    background: darkMode
      ? "#1E293B"
      : "#FFFFFF",

    borderRadius: "22px"
  }}
>

          <h2
  style={{
    fontSize:
  window.innerWidth <= 768
    ? "24px"
    : "32px",
    fontWeight: "900",
    marginBottom: "15px",

    background:
      "linear-gradient(90deg,#3B82F6,#10B981,#F59E0B)",

    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",

    animation:
      "gradientMove 6s linear infinite"
  }}
>
  💳 Recent Transactions
</h2>

<div
  style={{
    width: "140px",
    height: "4px",
    borderRadius: "20px",

    background:
      "linear-gradient(90deg,#3B82F6,#10B981)",

    marginBottom: "25px"
  }}
/>

          {transactions.map(item => (

            <div
  key={item._id}

  style={{
    ...cardStyle,
    background: darkMode
  ? "#1E293B"
  : "#FFFFFF",
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

gap: "10px",

    borderLeft:
      item.type === "Income"
        ? "5px solid #10B981"
        : "5px solid #EF4444",

    cursor: "pointer"
  }}

  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "translateX(10px)";
  }}

  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "translateX(0px)";
  }}
>

              <div>

  <h3
    style={{
      color: darkMode ? "#F8FAFC" : "#0F172A",
      marginBottom: "5px"
    }}
  >
    {item.category}
  </h3>

  <p
    style={{
      color: darkMode ? "#CBD5E1" : "#64748B"
    }}
  >
    {item.type}
  </p>

</div>

<h2
  style={{
    color:
      item.type === "Income"
        ? "#10B981"
        : "#EF4444"
  }}
>
  ₹ {item.amount}
</h2>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default Reports;