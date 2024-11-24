import { useState, useEffect } from "react";
import { signUp } from "../../superbase/auth";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../backendFunctions/backendFunctions";
import { getUser } from "../../superbase/auth";

export default function SignUp({ screenSize }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  const handleSignUp = async () => {
    const { data, error } = await signUp(email, password);
    if (data.user) {
      const user = {
        user_id: data.user.id,
        name: fullname,
        created: data.user.created_at,
        email: data.user.email,
      };
      await createUser(user);
    }

    if (error) {
      setError(error.message);
    } else {
      Navigate("/home");
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const { user } = await getUser();
      if (user?.user) {
        Navigate("/home");
      }
    };
    checkUser();
  }, [Navigate]);

  const dynamicStyles = {
    input: {
      width: screenSize.width < 480 ? "250px" : "300px",
    },
    button: {
      width: screenSize.width < 480 ? "250px" : "300px",
      padding: screenSize.width < 480 ? "10px 14px" : "14px 20px",
    },
    title: {
      fontSize: screenSize.width < 480 ? "1.5rem" : "2rem",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-b from-[#BCF4F5] to-[#D9F2B4] font-poppins text-center">
      {/* Title and Subtitle */}
      <h1 style={dynamicStyles.title} className="font-bold text-gray-800 mb-2">
        Create Your Account
      </h1>
      <p className="text-base text-gray-600 mb-8">Sign up to get started</p>

      {/* Input Fields */}
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={dynamicStyles.input}
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
        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullName(e.target.value)}
          style={dynamicStyles.input}
          className="px-4 py-3 mb-3 border border-[#B4EBCA] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#BCF4F5] bg-white"
        />
      </div>

      {/* Sign Up Button */}
      <div>
        <button
          style={dynamicStyles.button}
          className="bg-gradient-to-r from-[#B4EBCA] to-[#D9F2B4] text-white font-bold rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-200 hover:scale-105"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

      {/* Footer */}
      <p className="text-sm text-gray-800 mt-6">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-[#2F80ED] hover:underline transition-colors duration-300"
        >
          Log In
        </a>
      </p>
    </div>
  );
}
