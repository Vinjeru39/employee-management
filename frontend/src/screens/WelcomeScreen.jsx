import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div
      className="welcome-card"
      style={{
        display: "flex",
        justifyContent: "center",
        height: "60vh",
        backgroundColor: "#f8f9fa", // Matching the LoginScreen background
        paddingTop: "50px",
        marginLeft: "300px",
      }}
    >
      <div
        className="card"
        style={{
          padding: "40px 50px",
          borderRadius: "12px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h3
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#6f42c1", // Same brand color as LoginScreen
          }}
        >
          Adventure starts here!
        </h3>
        <p
          style={{
            fontSize: "18px",
            color: "#6c757d", // Muted secondary text color
          }}
        >
          Welcome {userInfo?.name}, make your app management easy and fun!
        </p>
      </div>
    </div>
  );
};

export default Welcome;
