import { useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { useChat } from './context/ChatContext';
// import beepSound from "./assets/ping-82822.mp3"; // Uncomment if you want to use sound

const URL = "http://localhost:5000"; // Server URL

export const socket = io(URL, {
    autoConnect: false, // We manage connection explicitly
    reconnectionAttempts: 3, // Limit reconnection attempts
    reconnectionDelay: 1000, // Delay between reconnection attempts
    reconnectionDelayMax: 5000, // Maximum delay between reconnection attempts
});

const Socket = () => {
    const {
        setUserId,
        setIsConnected,
        setMessages,
        setOnlineUsers,
        receiver,
        setReceiver,
        setIsSearching,
        setIsTyping,
        setMessage,
        setIsSending,
    } = useChat();

    // Initialize socket connection
    useEffect(() => {
        socket.connect();
        console.log("Socket connected");

        return () => {
            socket.disconnect();
            console.log("Socket disconnected");
        };
    }, []);

    // Handle connection and disconnection states
    useEffect(() => {
        const handleConnect = () => setIsConnected(true);
        const handleDisconnect = () => setIsConnected(false);

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
        };
    }, [setIsConnected]);

    // Handle user ID and set up socket events
    useEffect(() => {
        const uniqueId = uuidv4();
        console.log("Generated User ID:", uniqueId);
        setUserId(uniqueId);

        socket.emit("new-online-user", uniqueId, (error) => {
            if (error) {
                alert(`Error connecting: ${error}`);
            }
        });

        const handleOnlineUsers = (users) => {
            setOnlineUsers(users);
        };

        const handleSendMessage = (message) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { stranger: message }, // Assuming 'stranger' is the other user
            ]);
            setIsTyping(false);
        };

        const handleReceiveMessage = (message) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { you: message }, // Assuming 'you' is the current user
            ]);
            setIsSending(false);
        };

        const handleUserPaired = (pairedReceiver) => {
            setReceiver(pairedReceiver);
            setIsSearching(false);
            // Uncomment to play sound on pairing
            // const audio = new Audio(beepSound);
            // audio.play();
        };

        const handleChatClose = () => {
            setReceiver("");
            setMessage(""); // Clear the current message
            setIsTyping(false); // Stop typing indicator
        };

        const handleTyping = () => {
            setIsTyping(true);
        };

        const handleTypingStop = () => {
            setIsTyping(false);
        };

        // Register event listeners
        socket.on("get-online-users", handleOnlineUsers);
        socket.on("send-message", handleSendMessage);
        socket.on("receive-message", handleReceiveMessage);
        socket.on("user-paired", handleUserPaired);
        socket.on("chat-close", handleChatClose);
        socket.on("typing", handleTyping);
        socket.on("typing stop", handleTypingStop);

        return () => {
            // Clean up event listeners when component unmounts
            socket.off("get-online-users", handleOnlineUsers);
            socket.off("send-message", handleSendMessage);
            socket.off("receive-message", handleReceiveMessage);
            socket.off("user-paired", handleUserPaired);
            socket.off("chat-close", handleChatClose);
            socket.off("typing", handleTyping);
            socket.off("typing stop", handleTypingStop);
        };
    }, [
        setUserId,
        setOnlineUsers,
        setMessages,
        setReceiver,
        setMessage,
        setIsTyping,
        setIsSending,
        setIsSearching,
    ]);

    return null; // This component does not render anything directly
};

export default Socket;
