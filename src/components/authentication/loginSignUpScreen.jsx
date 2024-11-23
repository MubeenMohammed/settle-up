import React from "react";
import LongLogo from "../../assets/long_logo.svg";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../superbase/auth";
import { useEffect } from "react";

export default function LoginSignUpScreen() {
  const Navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { user } = await getUser();
      if (user.user) {
        Navigate("/home");
      }
    };
    checkUser();
  }, [Navigate]);


  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(to bottom, #BCF4F5, #D9F2B4)",
    },
    logoSection: {
      height: "320px", // Height of the logo section
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderBottom: "5px solid #000000", // Border at the bottom of the logo section
    },
    logo: {
      width: "100%",
    },
    buttonsSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "320px",
      marginBottom: "50px", // Space between buttons and the bottom
    },
    button: {
      width: "250px",
      height: "60px",
      padding: "12px",
      margin: "10px",
      border: "none",
      borderRadius: "15px",
      fontSize: "18px",
      cursor: "pointer",
      fontWeight: "700",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    loginButton: {
      backgroundColor: "#B4EBCA",
      color: "#333333",
    },
    signupButton: {
      backgroundColor: "#D9F2B4",
      color: "#333333",
    },
  };

  const animationStyle = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "300px",
      background: "#e0f7fa", // Light pastel background
    },
    svg: {
      width: "100%",
      maxWidth: "800px",
    },
    path: {
      strokeDasharray: 2000, // Length of the path
      strokeDashoffset: 2000, // Hide the path initially
      animation: "draw-line 3s ease-in-out forwards",
    },
    text: {
      fontFamily: "Arial, sans-serif",
      fontSize: "24px",
      fill: "#000000",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.logoSection}>
        <img
          src={LongLogo}
          alt="logo"
          style={styles.logo}
        />
      </div>
      <div style={styles.buttonsSection}>
        <button
          style={{ ...styles.button, ...styles.loginButton }}
          onClick={() => Navigate("/login")}
        >
          LOGIN
        </button>
        <button
          style={{ ...styles.button, ...styles.signupButton }}
          onClick={() => Navigate("/signup")}
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
}
