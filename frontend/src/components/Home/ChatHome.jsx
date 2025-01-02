import React from "react";
import chatHomeLogo from "../../assets/chatHomeLogo.png";
import { useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
// import { useDarkThemeContext } from "../../contextApi/DarkTheme";

const ChatHome = () => {
  // const { isDark } = useDarkThemeContext();  // Dark mode handling
  const navigate = useNavigate();  // For navigation between pages

  // Navigate to the chat page
  const navigateToChat = () => {
    navigate("/chat");  // This will navigate to the '/chat' route where chat functionality begins
  };

  return (
    <div className="firstStep">
      {/* Home button (not essential for chatting, but useful for navigation) */}
      {/* <button className="HomeButton">
        <GoHome
          onClick={() => navigate("/")}  // Go back to the home page on click
          className={isDark === "false" ? 'text-black' : 'text-white'}
        />
      </button> */}

      {/* Heading for the app (can be removed if not necessary for chat flow) */}
      {/* <h1 className={isDark === "false" ? "heading text-black" : "heading text-white"}>
        mateBatu: find someone to chat with
      </h1> */}

      {/* Logo (not critical for chat functionality, but visual element) */}
      {/* <div>
        <img src={chatHomeLogo} alt="Chat Home Logo" />
      </div> */}

      {/* Start chatting button */}
      <button
        onClick={navigateToChat}  // Trigger chat navigation
        className="startButtonHome text-white"
      >
        Start Talking
      </button>
    </div>
  );
};

export default ChatHome;
