import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../superbase/auth";
import LongLogo from "../../assets/long_logo.svg";

export default function LoginSignUpScreen({ screenSize }) {
  const Navigate = useNavigate();

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
    button: {
      width: screenSize.width < 480 ? "200px" : "250px",
      height: screenSize.width < 480 ? "50px" : "60px",
    },
    container: {
      fontSize: screenSize.width < 480 ? "14px" : "16px",
    },
  };

  return (
    <div
      className="flex flex-col justify-between items-center h-screen bg-gradient-to-b from-[#BCF4F5] to-[#D9F2B4]"
      style={dynamicStyles.container}
    >
      {/* Logo Section */}
      <div className="h-[320px] flex flex-col items-center justify-center border-b-4 border-black">
        <img src={LongLogo} alt="logo" className="w-full" />
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col items-center h-[320px] mb-12">
        <button
          style={dynamicStyles.button}
          className="px-3 py-2 mb-2 bg-[#B4EBCA] text-gray-800 font-bold rounded-lg shadow-md hover:shadow-lg transition-all"
          onClick={() => Navigate("/login")}
        >
          LOGIN
        </button>
        <button
          style={dynamicStyles.button}
          className="px-3 py-2 bg-[#D9F2B4] text-gray-800 font-bold rounded-lg shadow-md hover:shadow-lg transition-all"
          onClick={() => Navigate("/signup")}
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
}
