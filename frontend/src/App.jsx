"use client";
import { Route, Routes, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Socket from './Socket';
// import { useAuthContext } from './context/authContext.jsx';

import Home from './components/Home/ChatHome.jsx';
// Commented out non-chat related imports and routes
// import Home from './pages/Home';
// import './App.css';
// import Toaster from 'react-hot-toast';
// import Login from "./pages/Login.jsx";
// import Signup from "./pages/Signup.jsx";
// import News from "./pages/News.jsx";
// import Events from "./pages/Events.jsx";
// import Home2 from "./pages/Home2.jsx";
// import Admin from "./pages/Admin.jsx";
// import Leadboard from "./pages/Leadboard.jsx";
// import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
// import StudyZone from './pages/StudyZone.jsx';
// import ProfilePage from './pages/ProfilePage.jsx';
// import AboutUs from './pages/AboutUs.jsx';
// import { useDarkThemeContext } from './contextApi/DarkTheme.jsx';

function App() {
  // const { authUser } = useAuthContext();  // Commented out because it's not needed for chat functionality
  // const { isDark } = useDarkThemeContext();  // Commented out because it's not related to chat

  return (
    // <div className={isDark === "false" ? 'main' : 'main darkMain'}>
    <div className="main">
      <Socket />  {/* Keep Socket for managing WebSocket connection */}

      <Routes>  
        <Route path="/" element={<Navigate to="/chatHome" />} />
        <Route path="/chatHome"  element={<Home/>} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
