import { useState, useEffect } from "react";
import { login } from "../../superbase/auth";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../superbase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  const handleLogin = async () => {
    const { data, error } = await login(email, password);
    if (error) {
      setError(error.message);
    } else {
      console.log(data);
      Navigate("/home");
    }
  };

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
      alignItems: "center",
      justifyContent: "center",
      height: "915px",
      width: "412px",
      background: "linear-gradient(to bottom, #BCF4F5, #D9F2B4)",
      fontFamily: "'Poppins', sans-serif",
      textAlign: "center",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#333333",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "16px",
      color: "#555555",
      marginBottom: "30px",
    },
    input: {
      width: "300px",
      padding: "12px",
      margin: "10px 0",
      border: "1px solid #B4EBCA",
      borderRadius: "8px",
      fontSize: "16px",
      outline: "none",
      transition: "border-color 0.3s ease",
      backgroundColor: "#FFFFFF",
    },
    inputFocus: {
      borderColor: "#BCF4F5",
    },
    button: {
      width: "300px",
      padding: "12px",
      margin: "15px 0",
      border: "none",
      borderRadius: "8px",
      fontSize: "18px",
      fontWeight: "bold",
      color: "#FFFFFF",
      background: "linear-gradient(135deg, #B4EBCA, #D9F2B4)",
      cursor: "pointer",
      boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
      transition: "background 0.3s ease, transform 0.2s ease",
    },
    buttonHover: {
      transform: "scale(1.05)",
    },
    error: {
      color: "red",
      fontSize: "14px",
      marginTop: "10px",
    },
    link: {
      fontSize: "14px",
      color: "#2F80ED",
      textDecoration: "none",
      transition: "color 0.3s ease",
    },
    footer: {
      fontSize: "14px",
      color: "#333333",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome Back!</h1>
      <p style={styles.subtitle}>Log in to your account</p>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>
      <div>
        <button
          style={styles.button}
          onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, styles.button)}
          onClick={handleLogin}
        >
          Log In
        </button>
      </div>
      {error && <p style={styles.error}>{error}</p>}
      <p style={styles.footer}>
        Don’t have an account?{" "}
        <a
          href="/signup"
          style={styles.link}
        >
          Sign Up
        </a>
      </p>
    </div>
  );
}
