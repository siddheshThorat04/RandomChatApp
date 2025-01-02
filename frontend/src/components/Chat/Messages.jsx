import React, { useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext.jsx';
import { socket } from '../../Socket';
import dp from '../../assets/dp.png';
// import { useDarkThemeContext } from '../../contextApi/DarkTheme'; // Commenting out dark theme logic
import { GoHome } from "react-icons/go";

const Messages = () => {
    const { userId, isSearching, setIsSearching, receiver, messages, setMessages, isTyping, message } = useChat();
    // const isDark = useDarkThemeContext(); // Commented out for now
    const messagesRef = useRef(null);

    // Scroll to bottom whenever a new message is added
    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages]);

    // Handle navigation to start a new conversation
    const newChat = () => {
        window.location.href = "/"; // Redirect to home page for a new conversation
    }

    return (
        <div id='savedchat' className='w-full h-screen flex flex-col p-4 bg-gray-50' ref={messagesRef}>
            {/* Home button to go back to the home page */}
            <button className="absolute top-4 left-4 text-2xl text-gray-800">
                <GoHome onClick={() => window.location.href = "/"} />
            </button>

            {/* Display when there is no ongoing chat */}
            {!isSearching && !receiver && receiver !== "" && (
                <>
                    <div className='mt-16 text-xl text-center text-gray-700'>mateBatu: talk to strangers</div>
                    <div className='mt-4 text-center'>
                        <button 
                            onClick={newChat} 
                            className='px-6 py-2 bg-blue-500 text-white rounded-md'>
                            Start a new conversation
                        </button>
                    </div>
                </>
            )}

            {/* Display connected status when a receiver is available */}
            {receiver && <p className="mt-4 text-green-600 text-center font-semibold">Connected ✅</p>}

            {/* Render messages */}
            <div className='flex-1 overflow-y-auto mt-4'>
                {messages.map((message, index) => (
                    <div key={index} className={message?.stranger ? "flex items-start mb-4" : "flex items-start justify-end mb-4"}>
                        {/* Display Stranger's profile picture */}
                        {message?.stranger && (
                            <div className='mr-2'>
                                <img src={dp} alt="Stranger" className='w-8 h-8 rounded-full' />
                            </div>
                        )}
                        {/* Display the message content */}
                        <div className={message?.stranger ? "bg-gray-200 p-3 rounded-lg max-w-xs" : "bg-blue-500 text-white p-3 rounded-lg max-w-xs"}>
                            <p>{message?.stranger ? message.stranger : message.you}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Display typing status */}
            {isTyping && (
                <div className="flex items-center justify-start mt-4 text-gray-500">
                    <span className='w-8 h-8 rounded-full mr-2'>
                        <img src={dp} alt="Stranger" className='w-full h-full' />
                    </span>
                    <h4 className='text-gray-600'>typing...🤔</h4>
                </div>
            )}

            {/* Searching for a new chat */}
            {isSearching && <p className='text-blue-500 text-center mt-4'>Looking for someone you can chat with...🧐</p>}

            {/* Display when a partner has disconnected */}
            {!isSearching && !receiver && receiver === "" && (
                <>
                    <div className='mt-4 text-center text-red-500'>Stranger has disconnected.</div>
                    <div className='mt-4 text-center text-red-500'>Your conversational partner has disconnected</div>
                </>
            )}
        </div>
    );
};

export default Messages;
