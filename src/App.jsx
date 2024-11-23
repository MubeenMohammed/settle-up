import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/login";
import SignUp from "./components/authentication/signUp";
import HomePage from "./components/homepage/homepage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/"
          element={<HomePage />}
        />
      </Routes>
    </Router>
  );
}
