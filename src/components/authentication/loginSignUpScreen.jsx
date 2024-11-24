import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../superbase/auth";
import LongLogo from "../../assets/long_logo.svg";

export default function LoginSignUpScreen({ screenSize }) {
  const Navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { user } = await getUser();
      if (user?.user) {
        Navigate("/home"); // Navigate to home if the user is logged in
      }
    };
    checkUser();
  }, [Navigate]);

  const dynamicStyles = {
    button: {
      width: screenSize?.width < 480 ? "200px" : "250px",
      height: screenSize?.width < 480 ? "50px" : "60px",
    },
    container: {
      fontSize: screenSize?.width < 480 ? "14px" : "16px",
    },
  };

  return (
    <div
      className="relative flex flex-col justify-between items-center h-screen"
      style={dynamicStyles.container}
    >
      {/* Semi-Circle Section */}
      <div className="w-full h-[50vh] bg-[#BCF4F5] relative">
        {/* Semi-Circle Shape */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[100%] bg-[#f5f5f5]"
          style={{
            clipPath: "ellipse(100% 60% at 50% 100%)",
          }}
        />
        {/* Logo */}
        <div className="absolute top-1/4 left-0 right-0 flex justify-center">
          <img
            src={LongLogo}
            alt="SettleUp Logo"
            className="w-64 md:w-72 h-auto"
          />
        </div>
      </div>

      {/* Bottom Section with Pulse Animation */}
      <div className="w-full h-full bg-[#D9F2B4] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Buttons */}
        <div className="z-10 flex flex-col items-center mb-12">
          <button
            style={dynamicStyles.button}
            className="px-4 py-3 mb-4 bg-[#B4EBCA] text-[#234F3D] font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-[#B4EBCA]/90 transition-all"
            onClick={() => Navigate("/login")}
          >
            LOGIN
          </button>
          <button
            style={dynamicStyles.button}
            className="px-4 py-3 bg-[#D9F2B4] text-[#234F3D] font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-[#D9F2B4]/90 transition-all"
            onClick={() => Navigate("/signup")}
          >
            SIGN UP
          </button>
        </div>

        {/* Pulse Animation */}
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
    </div>
  );
}