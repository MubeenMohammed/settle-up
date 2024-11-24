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
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto transform translate-y-1/2"
          preserveAspectRatio="none"
        >
          <path
            fill="#B4EBCA"
            fillOpacity="0.8"
            d="M0,160L48,133.3C96,107,192,53,288,64C384,75,480,149,576,176C672,203,768,181,864,160C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,160L48,133.3C96,107,192,53,288,64C384,75,480,149,576,176C672,203,768,181,864,160C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,192L40,176C80,160,160,128,240,112C320,96,400,96,480,133.3C560,171,640,245,720,240C800,235,880,149,960,133.3C1040,117,1120,171,1200,186.7C1280,203,1360,181,1400,170.7L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z;
                M0,160L48,133.3C96,107,192,53,288,64C384,75,480,149,576,176C672,203,768,181,864,160C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </path>
        </svg>
      </div>
    </div>
  );
}
