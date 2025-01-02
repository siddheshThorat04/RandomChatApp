const express = require("express");
// const cors = require("cors");  // CORS is not necessary for the chat functionality itself
// const cookieParser = require('cookie-parser'); // Cookie parsing is not required for chat itself
// const { createServer } = require("http");  // We already import createServer at the bottom
// require("dotenv").config();  // Environment variable setup is not needed for chat logic

// const connectDb = require("./db/connectDb.js");  // DB connection is not required for chat functionality
// const authRoutes = require("./routes/authRoutes");  // Authentication routes are not needed for chat
// const adminRoutes = require("./routes/adminRoutes");  // Admin routes are not related to chat
// const userRoutes = require("./routes/userRoutes");  // User-related routes are not needed for chat

const app = express();

// const server = createServer(app);  // The server creation is required, but we initialize it for socket.io
const server = require("http").createServer(app);  // Moved the `createServer` directly to where we need it

// app.use(cookieParser());  // Not necessary for chat-specific logic
// app.use(express.json());  // You might need JSON parsing for API routes, but it's not needed for WebSocket
// app.use(cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true
// }));  // CORS is not strictly necessary for chat unless you need it for the frontend

// app.use("/api/auth", authRoutes);  // Commenting out API routes as they aren't needed for the chat functionality
// app.use("/api/admin", adminRoutes);  // Commenting out admin routes
// app.use("/api/user", userRoutes);  // Commenting out user routes

// Socket setup (chat-related logic)
const socketSetup = require("./socket"); // Import the socket setup for chat functionality

// const port = process.env.PORT || 5000;  // Port is needed for the server to run
const port = 5000; // We can hard-code this for now, assuming you want a fixed port for the chat app

server.listen(port, () => {
    // connectDb();  // Commenting out DB connection setup
    console.log(`Server running on port http://localhost:${port}`);
});

// Socket setup (for handling chat connections)
socketSetup(server); // Setting up WebSocket server for chat functionality
    