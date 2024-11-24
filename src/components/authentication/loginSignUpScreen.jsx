import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../superbase/auth";
import LongLogo from "../../assets/long_logo.svg"; // Replace with your logo path
import BackgroundImage from "../../assets/background.svg"; // Replace with your SVG background

const LoginSignUpScreen = () => {
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { user } = await getUser();
      if (user?.user) {
        navigate("/home");
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div className="relative h-screen w-full bg-gradient-to-b from-[#BCF4F5] to-[#D9F2B4]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          style={{ opacity: 0.7, zIndex: -1, height: "100vh", objectFit: "cover" }}
          src={BackgroundImage}
          alt="Background Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="absolute inset-0 flex flex-col justify-between items-center">
        {/* Title Section */}
        <div className="mt-16 text-center">
          {/* Logo */}
          <img src={LongLogo} alt="SettleUp Logo" className="w-28 h-auto mx-auto mb-4" />
          {/* Title */}
          <h1 className="text-4xl font-bold text-[#234F3D]">WELCOME</h1>
          {/* Tagline */}
          <p className="text-sm text-[#234F3D] mt-2">
            Split bills effortlessly with your friends
          </p>
        </div>

        {/* Buttons Section */}
        <div className="w-full px-6 pb-12 flex flex-col items-center space-y-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full max-w-sm px-6 py-4 bg-[#1D3557] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            SIGN IN
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="w-full max-w-sm px-6 py-4 bg-white text-[#1D3557] font-bold rounded-full shadow-lg hover:shadow-xl border border-[#1D3557] transition-all"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUpScreen;