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
        alignItems: "flex-start",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        paddingTop: "50px",
      }}
    >
      <div
        className="card"
        style={{
          padding: "30px 60px",
          borderRadius: "10px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h3
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Welcome {userInfo?.name}
        </h3>
      </div>
    </div>
  );
};

export default Welcome;
