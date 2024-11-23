import { Link } from "react-router-dom";
import { logOut } from "../../superbase/auth";
import { getUser } from "../../superbase/auth";

export default function HomePage() {
    console.log(getUser());
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to My App</h1>
      <p style={styles.subtitle}>
        Manage your tasks and stay organized with ease.
      </p>

      <div style={styles.buttonContainer}>
        <Link
          to="/login"
          style={styles.button}
          onClick={() => logOut()}
        >
          Log Out
        </Link>
      </div>
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
  buttonContainer: {
    marginTop: "30px",
  },
  button: {
    textDecoration: "none",
    color: "white",
    backgroundColor: "#007BFF",
    padding: "10px 20px",
    borderRadius: "5px",
    margin: "0 10px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};
