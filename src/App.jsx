import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/homepage/homepage";
import Login from "./components/authentication/login";
import SignUp from "./components/authentication/signUp";
import LoginSignupScreen from "./components/authentication/loginSignUpScreen";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignupScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
