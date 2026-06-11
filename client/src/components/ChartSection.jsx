import React, { useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Sector
} from "recharts";

function ChartSection({
  totalIncome,
  totalExpense,
  darkMode,
  transactions,
  budget
}) {

  const [activeIndex1, setActiveIndex1] = useState(0);
  const [activeIndex2, setActiveIndex2] = useState(0);

  // BUDGET CHECK
  const budgetExceeded =
    Number(totalExpense) > Number(budget);


    // BLINK ANIMATION
const blinkStyle = `

  @keyframes blinkChart {

    0% {
      opacity: 1;
    }

    50% {
      opacity: 0.35;
    }

    100% {
      opacity: 1;
    }
  }
`;

  // PIE DATA
  const pieData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense }
  ];

  // CATEGORY DATA
  const categoryData = [];

  transactions
    .filter((t) => t.type === "Expense")
    .forEach((item) => {

      const found = categoryData.find(
        (c) => c.name === item.category
      );

      found
        ? found.value += Number(item.amount)

        : categoryData.push({
            name: item.category,
            value: Number(item.amount)
          });
    });

  // COLORS
  const COLORS = [
    "#10B981",
    "#EF4444",
    "#3B82F6",
    "#F59E0B",
    "#8B5CF6",
    "#EC4899",
    "#14B8A6"
  ];

  // 3D PIE EFFECT
  const renderActiveShape = (props) => {

    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill
    } = props;

    return (

      <g>

        {/* SHADOW */}
        <Sector
          cx={cx}
          cy={cy + 6}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 12}
          startAngle={startAngle}
          endAngle={endAngle}
          fill="rgba(0,0,0,0.25)"
        />

        {/* MAIN */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 12}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />

      </g>
    );
  };

  // CARD STYLE
  const cardStyle = {
    flex: "1",
    minWidth:
  window.innerWidth <= 768
    ? "100%"
    : "320px",
    height: "360px",
    padding: "22px",
    borderRadius: "28px",

    background: darkMode
      ? "rgba(30,41,59,0.75)"
      : "rgba(255,255,255,0.75)",

    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",

    border: darkMode
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(255,255,255,0.7)",

    boxShadow: darkMode
      ? `
        0 15px 40px rgba(0,0,0,0.45),
        inset 0 1px 1px rgba(255,255,255,0.04)
      `
      : `
        0 15px 40px rgba(0,0,0,0.08),
        inset 0 1px 1px rgba(255,255,255,0.9)
      `,

    transition: "0.4s"
  };

  const textColor =
    darkMode ? "#fff" : "#0f172a";

  return (

    <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap:
      window.innerWidth <= 768
        ? "15px"
        : "25px",

    marginTop: "30px"
  }}
>

      {/* ANIMATION STYLE */}
      <style>{blinkStyle}</style>

      {/* INCOME EXPENSE PIE */}
      <div

  style={{
    ...cardStyle,

    width:
      window.innerWidth <= 768
        ? "100%"
        : "auto"
  }}

        

        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "translateY(-12px) scale(1.04)";
        }}

        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "translateY(0px) scale(1)";
        }}
      >

        <h2
          style={{
            textAlign: "center",
            color: textColor,
            marginBottom: "10px"
          }}
        >
          Income vs Expense
        </h2>

        <div
          style={{
            width: "100%",
            height: "90%",

            animation:
              budgetExceeded
                ? "blinkChart 1s infinite"
                : "none"
          }}
        >

          <ResponsiveContainer>

            <PieChart>

              <Pie
                activeIndex={activeIndex1}
                activeShape={renderActiveShape}

                onMouseEnter={(_, i) =>
                  setActiveIndex1(i)
                }

                data={pieData}
                dataKey="value"

                innerRadius={55}
                outerRadius={95}

                paddingAngle={5}

                animationBegin={0}
                animationDuration={1800}
                animationEasing="ease-out"

                isAnimationActive={true}
              >

                {pieData.map((_, i) => (

                  <Cell
                    key={i}
                    fill={COLORS[i]}
                  />

                ))}

              </Pie>

              <Tooltip />
              <Legend
  wrapperStyle={{
    fontSize:
      window.innerWidth <= 768
        ? "10px"
        : "14px"
  }}
/>

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* CATEGORY PIE */}
      <div

          style={{
    ...cardStyle,

    width:
      window.innerWidth <= 768
        ? "100%"
        : "auto"
  }}

        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "translateY(-12px) scale(1.04)";
        }}

        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "translateY(0px) scale(1)";
        }}
      >

        <h2
          style={{
            textAlign: "center",
            color: textColor,
            marginBottom: "10px"
          }}
        >
          Expense Categories
        </h2>

        <div
          style={{
            width: "100%",
            height: "90%",

            animation:
              budgetExceeded
                ? "blinkChart 1s infinite"
                : "none"
          }}
        >

          <ResponsiveContainer>

            <PieChart>

              <Pie
                activeIndex={activeIndex2}
                activeShape={renderActiveShape}

                onMouseEnter={(_, i) =>
                  setActiveIndex2(i)
                }

                data={categoryData}
                dataKey="value"

                innerRadius={55}
                outerRadius={95}

                paddingAngle={4}

                animationBegin={200}
                animationDuration={2200}
                animationEasing="ease-in-out"

                isAnimationActive={true}
              >

                {categoryData.map((_, i) => (

                  <Cell
                    key={i}

                    fill={
                      COLORS[
                        i % COLORS.length
                      ]
                    }
                  />

                ))}

              </Pie>

              <Tooltip />
              <Legend
  wrapperStyle={{
    fontSize:
      window.innerWidth <= 768
        ? "10px"
        : "14px"
  }}
/>

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* BAR GRAPH */}
      <div

        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "translateY(-12px) scale(1.03)";
        }}

        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "translateY(0px) scale(1)";
        }}

        style={{
          width: "100%",
          height:
  window.innerWidth <= 768
    ? "350px"
    : "500px",

          padding:
  window.innerWidth <= 768
    ? "15px"
    : "25px",

          borderRadius: "28px",

          background: darkMode
            ? "rgba(30,41,59,0.75)"
            : "rgba(255,255,255,0.75)",

          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",

          border: darkMode
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(255,255,255,0.7)",

          boxShadow: darkMode
            ? `
              0 15px 40px rgba(0,0,0,0.45),
              inset 0 1px 1px rgba(255,255,255,0.04)
            `
            : `
              0 15px 40px rgba(0,0,0,0.08),
              inset 0 1px 1px rgba(255,255,255,0.9)
            `,

          transition: "0.4s"
        }}
      >

        <h2
          style={{
            textAlign: "center",
            color: textColor,
            marginBottom: "20px"
          }}
        >
          Expense Categories Graph
        </h2>

        <div
          style={{
            width: "100%",
            height: "85%"
          }}
        >

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={categoryData}
              barCategoryGap="25%"
            >

              <CartesianGrid
                strokeDasharray="4 4"
                opacity={0.2}
              />

              <XAxis
                dataKey="name"
                stroke={
                  darkMode
                    ? "#fff"
                    : "#000"
                }
              />

              <YAxis
                stroke={
                  darkMode
                    ? "#fff"
                    : "#000"
                }
              />

              <Tooltip
  cursor={{ fill: "transparent" }}
/>
              <Legend
  wrapperStyle={{
    fontSize:
      window.innerWidth <= 768
        ? "10px"
        : "14px"
  }}
/>

              <Bar
                dataKey="value"

                radius={[14,14,0,0]}

                animationDuration={3000}
                animationBegin={0}
                animationEasing="ease-out"
                activeBar={{
  fill: "#EC4899",
  stroke: "#ffffff",
  strokeWidth: 2
}}

                isAnimationActive={true}

                shape={(props) => {

                  const {
                    x,
                    y,
                    width,
                    height,
                    fill
                  } = props;

                  return (

                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      rx={14}
                      ry={14}
                      fill={fill}

                      style={{
                        animation:
                          budgetExceeded
                            ? "blinkChart 1s infinite"
                            : "none",

                        transformOrigin:
                          "center bottom"
                      }}
                    />

                  );
                }}
              >

                {categoryData.map((_, index) => (

                  <Cell
                    key={index}

                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />

                ))}

              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

export default ChartSection;