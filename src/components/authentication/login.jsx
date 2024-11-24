import { useState, useEffect } from "react";
import { login } from "../../superbase/auth";
import { useNavigate } from "react-router-dom";
import { getFriendsByUserId, getGroupsByUserId, getUserByUserId } from "../../backendFunctions/backendFunctions";

export default function Login({ screenSize }) {
  const dynamicStyles = {
    input: {
      width: screenSize.width < 480 ? "250px" : "300px",
    },
    button: {
      width: screenSize.width < 480 ? "250px" : "300px",
    },
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();
  const handleLogin = async () => {
    const { data, error } = await login(email, password);
    if (error) {
      setError(error.message);
    } else {
      if (data) {
        await getGroupsByUserId(data.user.id).then((data) => {
          sessionStorage.setItem("userGroups", JSON.stringify(data.data));
        });
        await getFriendsByUserId(data.user.id).then((data) => {
          sessionStorage.setItem("userFriends", JSON.stringify(data.data));
        });
        await getUserByUserId(data.user.id).then((data) => {
          sessionStorage.setItem("user", JSON.stringify(data.data[0]));
        });
      }
      Navigate("/home");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-b from-[#BCF4F5] to-[#D9F2B4] font-poppins text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
      <p className="text-base text-gray-600 mb-8">Log in to your account</p>
      <div>
        <input
          type="email"
          placeholder="Email"
          style={dynamicStyles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 mb-3 border border-[#B4EBCA] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#BCF4F5] bg-white"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={dynamicStyles.input}
          className="px-4 py-3 mb-3 border border-[#B4EBCA] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#BCF4F5] bg-white"
        />
      </div>
      <div>
        <button
          style={dynamicStyles.button}
          onClick={handleLogin}
          className="px-4 py-3 bg-gradient-to-r from-[#B4EBCA] to-[#D9F2B4] text-white font-bold rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-200 hover:scale-105"
        >
          Log In
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <p className="text-sm text-gray-800 mt-5">
        Don’t have an account?{" "}
        <a
          href="/signup"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
        >
          Sign Up
        </a>
      </p>
    </div>
    
  );
}
