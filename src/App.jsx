import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./components/homepage/homepage";
import Login from "./components/authentication/login";
import SignUp from "./components/authentication/signUp";
import LoginSignupScreen from "./components/authentication/loginSignUpScreen";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import AddBill from "./components/homepage/AddPages/addBill";
import AddGroup from "./components/homepage/AddPages/addGroup";
import GroupDetails from "./components/GroupPage/groupPage";
import GroupSettings from "./components/GroupPage/groupSettings";
import AddFriend from "./components/homepage/AddPages/addFriends";
import BillItemCards from "./components/SplitzPage/BillItemCards";

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
        <Route path="/bill-item-cards" element={<BillItemCards screenSize={screenSize} />} />
        <Route path="/add-friends" element={<AddFriend screenSize={screenSize} />} />
        <Route path="/add-expense" element={<AddBill screenSize={screenSize} />} />
        <Route path="/group-settings" element={<GroupSettings screenSize={screenSize} />} />
        <Route path="/add-group" element={<AddGroup screenSize={screenSize} />} />
        <Route path="/group-details" element={<GroupDetails screenSize={screenSize} />} />
        <Route path="*" element={<ErrorPage screenSize={screenSize} />} />

      </Routes>
    </Router>
  );
}

export default App;
