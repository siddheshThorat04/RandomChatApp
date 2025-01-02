import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';  // Commented out as it's not related to chat
// import { AuthContextProvider } from './contextApi/authContext.jsx';  // Commented out as it's not related to chat
// import { DarkThemeContextProvider } from './contextApi/DarkTheme.jsx';  // Commented out as it's not related to chat
import { ChatContextProvider } from './context/ChatContext.jsx';  // ChatContextProvider is necessary for chat functionality
import { BrowserRouter } from 'react-router-dom';  // If routing is required in the chat application, keep this

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChatContextProvider>  {/* Chat context provider for managing chat state */}
      <BrowserRouter>  {/* BrowserRouter for routing */}
        <App />  {/* Main App component which handles the chat interface */}
      </BrowserRouter>
    </ChatContextProvider>
  </React.StrictMode>
);
