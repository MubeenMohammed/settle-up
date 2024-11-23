import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.subtitle}>The page you're looking for doesn't exist.</p>
      <Link to="/login" style={styles.link}>
        Go to Login
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#555",
    margin: "20px 0",
  },
  link: {
    textDecoration: "none",
    color: "white",
    backgroundColor: "#007BFF",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
