import React, { useEffect } from 'react';
import { useChat } from '../../context/ChatContext.jsx';
import { socket } from '../../Socket.jsx';
import { VscDebugRestart } from "react-icons/vsc";
import { BsSend } from "react-icons/bs";
// import { useDarkThemeContext } from '../../contextApi/DarkTheme'; // Commented out for now

const MessageInput = () => {
    const { userId, onlineUsers, isSearching, setIsSearching, receiver, setReceiver, setMessages, isSending, setIsSending, message, setMessage, setIsTyping } = useChat();
    // const { isDark } = useDarkThemeContext(); // Commented out for now

    const newChat = () => {
        setIsSearching(true);
        setMessages([]);
        socket.emit("pairing-user", userId, (error) => {
            return;
        });
    };

    const sendMessage = () => {
        if (isSending) return;
        if (message === "") return;
        setIsSending(true);
        socket.emit("send-message", receiver, message, () => {
            setMessage("");
        });
    };

    const disconnectChat = () => {
        if (receiver) {
            socket.emit("chat-close", receiver, () => {
                setReceiver("");
                setIsTyping(false);
                setMessage("");
            });
        } else {
            socket.emit("unpairing-user", userId, () => {
                setIsSearching(false);
            });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    const typingHandle = (e) => {
        if (e.target.value !== "") {
            socket.emit("typing", receiver);
        } else {
            socket.emit("typing stop", receiver);
        }
    };

    useEffect(() => {
        if (userId && onlineUsers.find((user) => user.userId === userId)) {
            newChat();
        } else {
            // navigate("/");
        }
    }, []);

    const navigateToHome = () => {
        window.location.href = "/chatHome";
    };

    return (
        <div className="flex items-center p-4 bg-gray-800 fixed bottom-0 w-full border-t border-gray-700">
            
            {/* Restart / Disconnect button */}
            {receiver || isSearching ? (
                <button 
                    className="text-gray-200 border border-gray-200 p-2 rounded-full hover:bg-gray-700"
                    onClick={navigateToHome}>
                    <VscDebugRestart className="w-5 h-5" />
                </button>
            ) : (
                <button 
                    className="text-gray-600 border border-gray-400 p-2 rounded-full hover:bg-gray-200"
                    onClick={navigateToHome}
                    disabled={isSearching}>
                    <VscDebugRestart className="w-5 h-5" />
                </button>
            )}

            {/* Message input field */}
            <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 ml-4 p-2 bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none"
                onChange={(e) => {
                    setMessage(e.target.value);
                    typingHandle(e);
                }} 
                value={message} 
                onKeyDown={(e) => handleKeyPress(e)} 
                disabled={!receiver}
            />

            {/* Send button */}
            <button 
                className="ml-4 p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:opacity-50"
                onClick={sendMessage}
                disabled={!receiver || isSending}>
                <BsSend className="w-5 h-5" />
            </button>
        </div>
    );
};

export default MessageInput;
