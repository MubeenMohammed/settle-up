import { Link } from "react-router-dom";

export default function ErrorPage({ screenSize }) {
    const dynamicStyles = {
      container: {
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "'Arial', sans-serif",
        padding: screenSize.width < 480 ? "10px" : "20px",
      },
      title: {
        fontSize: screenSize.width < 480 ? "2rem" : "3rem",
        fontWeight: "bold",
        color: "#333",
      },
      subtitle: {
        fontSize: screenSize.width < 480 ? "1rem" : "1.2rem",
        color: "#555",
        margin: "20px 0",
      },
      link: {
        textDecoration: "none",
        color: "white",
        backgroundColor: "#007BFF",
        padding: screenSize.width < 480 ? "8px 16px" : "10px 20px",
        borderRadius: "5px",
        fontSize: screenSize.width < 480 ? "0.9rem" : "1rem",
        fontWeight: "bold",
        cursor: "pointer",
      },
    };
  
    return (
      <div style={dynamicStyles.container}>
        <h1 style={dynamicStyles.title}>404 - Page Not Found</h1>
        <p style={dynamicStyles.subtitle}>The page you're looking for doesn't exist.</p>
        <Link to="/login" style={dynamicStyles.link}>
          Go to Login
        </Link>
      </div>
    );
  }
  