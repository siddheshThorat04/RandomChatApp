import React, { useEffect } from 'react'

import Messages from '../components/Chat/Messages.jsx'; // Import Messages component (chat messages display)
import MessageInput from '../components/Chat/MessageInput.jsx'; // Import MessageInput component (for typing messages)
import { useChat } from '../context/ChatContext.jsx'; // Import Chat context to access chat-related state
// import { useAuthContext } from '../contextApi/authContext'; // Import Auth context to access authenticated user

const Chat = () => {
    const { receiver } = useChat(); // Extract receiver state from chat context (the current person being chatted with)
    // const { authUser } = useAuthContext(); // Extract authUser state from auth context (the authenticated user)

    useEffect(() => {
        // Debugging useEffect: Logs the user info and receiver to the console
        // console.log(authUser);
        console.log("receiver in chat.jsx", receiver);
    }, []); // Empty dependency array to run the effect only once when the component mounts

    return (
        <>
            <div className="chat">
                {/* Chat UI */}
                <Messages /> {/* Display the messages in the chat */}
                <MessageInput /> {/* Input field to send messages */}
            </div>
        </>
    );
}

export default Chat;
