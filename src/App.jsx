import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./components/homepage/homepage";
import Login from "./components/authentication/login";
import SignUp from "./components/authentication/signUp";
import LoginSignupScreen from "./components/authentication/loginSignUpScreen";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import ErrorPage from "./components/ErrorPage/ErrorPage";
//import AddExpense from "./components/homepage/AddPages/addExpense";
import AddGroup from "./components/homepage/AddPages/addGroup";
import GroupDetails from "./components/GroupPage/groupPage";
import GroupMembersPage from "./components/GroupPage/groupMembersPage";

function App() {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignupScreen screenSize={screenSize} />} />
        <Route path="/login" element={<Login screenSize={screenSize} />} />
        <Route path="/signup" element={<SignUp screenSize={screenSize} />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage screenSize={screenSize} />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/add-expense" element={<AddExpense screenSize={screenSize} />} /> */}
        <Route path="/group-members" element={<GroupMembersPage screenSize={screenSize} />} />
        <Route path="/add-group" element={<AddGroup screenSize={screenSize} />} />
        <Route path="/group-details" element={<GroupDetails screenSize={screenSize} />} />
        <Route path="*" element={<ErrorPage screenSize={screenSize} />} />

      </Routes>
    </Router>
  );
}

export default App;
