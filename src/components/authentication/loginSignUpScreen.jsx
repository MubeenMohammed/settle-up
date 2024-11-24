import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../superbase/auth";
import LongLogo from "../../assets/long_logo.svg";

const LoginSignUpScreen = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
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
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-[#BCF4F5] to-[#D9F2B4]">
      {/* Logo and Scale Container */}
      <div className="relative w-full flex flex-col items-center mt-20">
        {/* Logo Circle */}
        <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-md z-10">
          <img src={LongLogo} alt="SettleUp Logo" className="w-28 h-auto" />
        </div>

        {/* Enhanced Scale SVG */}
        <div className="absolute top-32 w-[600px]">
          <svg
            viewBox="0 0 400 300"
            className="w-full h-full"
            style={{
              transform:
                hoveredButton === "login"
                  ? "rotate(-5deg)"
                  : hoveredButton === "signup"
                  ? "rotate(5deg)"
                  : "rotate(0deg)",
              transition: "transform 0.5s ease",
            }}
          >
            {/* Decorative top piece */}
            <path d="M195,0 Q200,10 205,0 L205,15 Q200,20 195,15 Z" fill="#234F3D" />

            {/* Main center chain */}
            <path
              d="M200,15 L200,40 M197,20 L203,20 M197,25 L203,25 M197,30 L203,30 M197,35 L203,35"
              stroke="#666"
              strokeWidth="2"
              fill="none"
            />

            {/* Main beam */}
            <path
              d="M40,40 Q35,40 35,45 L35,47 Q35,52 40,52 L360,52 Q365,52 365,47 L365,45 Q365,40 360,40 Z"
              fill="#234F3D"
            />

            {/* Left chain */}
            <path
              d="M80,52 L80,120 M77,60 L83,60 M77,70 L83,70 M77,80 L83,80 M77,90 L83,90 M77,100 L83,100 M77,110 L83,110"
              stroke="#666"
              strokeWidth="2"
              fill="none"
            />

            {/* Right chain */}
            <path
              d="M320,52 L320,120 M317,60 L323,60 M317,70 L323,70 M317,80 L323,80 M317,90 L323,90 M317,100 L323,100 M317,110 L323,110"
              stroke="#666"
              strokeWidth="2"
              fill="none"
            />

            {/* Left scale plate */}
            <g transform="translate(80,120)">
              <circle cx="0" cy="0" r="3" fill="#666" />
              <path
                d="M-40,-5 Q-45,-5 -45,0 L-45,10 Q-45,15 -40,15 L40,15 Q45,15 45,10 L45,0 Q45,-5 40,-5 Z"
                fill="#B4EBCA"
                transform={hoveredButton === "login" ? "rotate(-10)" : "rotate(0)"}
                style={{ transition: "transform 0.5s ease" }}
              />
            </g>

            {/* Right scale plate */}
            <g transform="translate(320,120)">
              <circle cx="0" cy="0" r="3" fill="#666" />
              <path
                d="M-40,-5 Q-45,-5 -45,0 L-45,10 Q-45,15 -40,15 L40,15 Q45,15 45,10 L45,0 Q45,-5 40,-5 Z"
                fill="#D9F2B4"
                transform={hoveredButton === "signup" ? "rotate(-10)" : "rotate(0)"}
                style={{ transition: "transform 0.5s ease" }}
              />
            </g>

            {/* Login button */}
            <foreignObject x="0" y="120" width="160" height="80">
              <div
                className="w-full h-full flex items-center justify-center"
                onMouseEnter={() => setHoveredButton("login")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <button
                  className="px-6 py-3 bg-[#B4EBCA] text-[#234F3D] font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-[#B4EBCA]/90 transition-all"
                  onClick={() => navigate("/login")}
                >
                  LOGIN
                </button>
              </div>
            </foreignObject>

            {/* Signup button */}
            <foreignObject x="240" y="120" width="160" height="80">
              <div
                className="w-full h-full flex items-center justify-center"
                onMouseEnter={() => setHoveredButton("signup")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <button
                  className="px-6 py-3 bg-[#D9F2B4] text-[#234F3D] font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-[#D9F2B4]/90 transition-all"
                  onClick={() => navigate("/signup")}
                >
                  SIGN UP
                </button>
              </div>
            </foreignObject>
          </svg>
        </div>
      </div>

      {/* Animated Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto transform translate-y-1/2"
          preserveAspectRatio="none"
        >
          <path
            fill="#FFFFFF"
            fillOpacity="1"
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
};

export default LoginSignUpScreen;