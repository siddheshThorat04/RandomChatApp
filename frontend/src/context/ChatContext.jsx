"use client";
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
// Create context for chat
const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
    // State for managing chat user data
    const [userId, setUserId] = useState(() => uuidv4());  // Default user ID generation
    const [isSearching, setIsSearching] = useState(true);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [receiver, setReceiver] = useState(null);  // Initialize as null, better handling
    const [isTyping, setIsTyping] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [message, setMessage] = useState("");
    const [mateId, setMateId] = useState("");  // If needed, this can be grouped with receiver

    return (
        <ChatContext.Provider
            value={{
                userId,
                setUserId,
                messages,
                setMessages,
                onlineUsers,
                setOnlineUsers,
                isConnected,
                setIsConnected,
                receiver,
                setReceiver,
                isSearching,
                setIsSearching,
                isTyping,
                setIsTyping,
                isSending,
                setIsSending,
                message,
                setMessage,
                mateId,  // Keep it in case you want to manage a mateId
                setMateId
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

ChatContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Custom hook to use chat context values
const useChat = () => useContext(ChatContext);

export {
    ChatContext,
    ChatContextProvider,
    useChat
};
