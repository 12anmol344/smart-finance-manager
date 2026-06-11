import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();

  const name =
    localStorage.getItem("userName");

  const email =
    localStorage.getItem("userEmail");

  const joined =
    localStorage.getItem("joinedDate");

  // DIFFERENT IMAGE FOR EACH USER
  const [profileImage, setProfileImage] =
    useState(

      localStorage.getItem(
        `profileImage_${email}`
      ) ||

      "https://i.pravatar.cc/200"
    );

  // CHANGE IMAGE
  const changeImage = (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend = () => {

      setProfileImage(
        reader.result
      );

      // SAVE IMAGE USERWISE
      localStorage.setItem(
        `profileImage_${email}`,
        reader.result
      );
    };

    reader.readAsDataURL(file);
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "userName"
    );

    localStorage.removeItem(
      "userEmail"
    );

    navigate("/");
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#111827)",

        padding: "20px",
        fontFamily: "Arial"
      }}
    >

      {/* PROFILE CARD */}
      <div
  style={{
    width: "460px",
    borderRadius: "30px",
    padding: "35px",

    background:
      "rgba(255,255,255,0.08)",

    backdropFilter: "blur(20px)",

    border:
      "1px solid rgba(255,255,255,0.12)",

    boxShadow:
      "0 20px 50px rgba(59,130,246,.25)",

    color: "white",

    textAlign: "center",

    position: "relative",

    overflow: "hidden",

    transition: ".4s ease"
  }}

  onMouseEnter={(e)=>{
    e.currentTarget.style.transform =
      "translateY(-8px)";
  }}

  onMouseLeave={(e)=>{
    e.currentTarget.style.transform =
      "translateY(0px)";
  }}
>

        {/* GLOW */}
        <div
          style={{
            position: "absolute",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            background: "#3B82F6",
            filter: "blur(120px)",
            top: "-60px",
            right: "-60px",
            opacity: 0.35
          }}
        />

        {/* IMAGE */}
        <div
          style={{
            position: "relative",
            display: "inline-block"
          }}
        >

          <img
            src={profileImage}

            alt="profile"

            style={{
  width: "130px",
  height: "130px",
  borderRadius: "50%",

  border: "5px solid #3B82F6",

  objectFit: "cover",

  marginBottom: "20px",

  position: "relative",

  zIndex: 2,

  boxShadow:
    "0 0 30px rgba(59,130,246,.7)"
}}/>

          {/* EDIT BUTTON */}
          <label
            htmlFor="upload"

            style={{
              position: "absolute",
              bottom: "18px",
              right: "0",

              width: "38px",
              height: "38px",

              borderRadius: "50%",

              background:
                "linear-gradient(135deg,#3B82F6,#2563EB)",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              cursor: "pointer",

              fontSize: "16px",

              boxShadow:
                "0 4px 10px rgba(0,0,0,0.3)"
            }}
          >
            ✏️
          </label>

          <input
            id="upload"
            type="file"
            accept="image/*"

            onChange={changeImage}

            style={{
              display: "none"
            }}
          />

        </div>

        {/* NAME */}
        <h1
  style={{
    margin: 0,

    fontSize: "34px",

    fontWeight: "900",

    position: "relative",

    zIndex: 2,

    background:
      "linear-gradient(90deg,#3B82F6,#10B981)",

    WebkitBackgroundClip: "text",

    WebkitTextFillColor: "transparent"
  }}
>
          {name || "User"}
        </h1>

        {/* EMAIL */}
        <p
          style={{
            color: "#cbd5e1",
            marginTop: "8px",
            fontSize: "15px",
            position: "relative",
            zIndex: 2
          }}
        >
          {email}
        </p>

        {/* INFO BOX */}
        <div
          style={{
            marginTop: "30px",

            background:
              "rgba(255,255,255,0.05)",

            border:
              "1px solid rgba(255,255,255,0.08)",

            borderRadius: "20px",

            padding: "20px",

            textAlign: "left",

            position: "relative",

            zIndex: 2
          }}
        >

          <div
            style={{
              marginBottom: "18px"
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "#93c5fd"
              }}
            >
              👤 Name
            </h3>

            <p>{name}</p>
          </div>

          <div
            style={{
              marginBottom: "18px"
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "#93c5fd"
              }}
            >
              📧 Email
            </h3>

            <p>{email}</p>
          </div>

          <div>
            <h3
              style={{
                margin: 0,
                color: "#93c5fd"
              }}
            >
              📅 Joined
            </h3>

            <p>{joined}</p>
          </div>

        </div>
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "12px",
    marginTop: "25px",
    position: "relative",
    zIndex: 2
  }}
>

  <div
    style={{
      background: "rgba(255,255,255,.05)",
      padding: "15px",
      borderRadius: "15px"
    }}
  >
    <h2>💰</h2>
    <h3>24</h3>
    <p>Transactions</p>
  </div>

  <div
    style={{
      background: "rgba(255,255,255,.05)",
      padding: "15px",
      borderRadius: "15px"
    }}
  >
    <h2>🏆</h2>
    <h3>3</h3>
    <p>Awards</p>
  </div>

  <div
    style={{
      background: "rgba(255,255,255,.05)",
      padding: "15px",
      borderRadius: "15px"
    }}
  >
    <h2>📈</h2>
    <h3>74%</h3>
    <p>Health</p>
  </div>

</div>
        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "30px",
            position: "relative",
            zIndex: 2
          }}
        >
          <button
  onClick={() =>
    navigate("/dashboard")
  }

  onMouseEnter={(e)=>{
    e.currentTarget.style.transform =
      "translateY(-4px) scale(1.03)";
  }}

  onMouseLeave={(e)=>{
    e.currentTarget.style.transform =
      "translateY(0px) scale(1)";
  }}

  style={{
    flex: 1,
    padding: "14px",
    border: "none",
    borderRadius: "14px",

    background:
      "linear-gradient(135deg,#3B82F6,#2563EB)",

    color: "white",

    fontSize: "15px",

    cursor: "pointer",

    fontWeight: "bold",

    transition: ".3s ease"
  }}
>
            Dashboard
          </button>

          <button
  onClick={logout}

  onMouseEnter={(e)=>{
    e.currentTarget.style.transform =
      "translateY(-4px) scale(1.03)";
  }}

  onMouseLeave={(e)=>{
    e.currentTarget.style.transform =
      "translateY(0px) scale(1)";
  }}

  style={{
    flex: 1,
    padding: "14px",
    border: "none",
    borderRadius: "14px",

    background:
      "linear-gradient(135deg,#EF4444,#DC2626)",

    color: "white",

    fontSize: "15px",

    cursor: "pointer",

    fontWeight: "bold",

    transition: ".3s ease"
  }}
>
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;