let onlineUsers = new Map();  // Using a Map for fast lookups
let unpairedUsers = new Set();  // Using Set for unique userId entries

/**
 * Adds a user to the online users list.
 * Ensures no duplicate userId or socketId exists.
 */
const addUser = (userId, socketId) => {
    // Check if userId already exists
    if (onlineUsers.has(userId)) {
        return { success: false, message: "UserId is already in use." };
    }

    // Check if socketId is already in use
    for (let [existingUserId, user] of onlineUsers) {
        if (user.socketId === socketId) {
            removeUser(user.socketId);  // Remove user with this socketId if found
            break;
        }
    }

    const user = { userId, socketId };
    onlineUsers.set(userId, user);  // Use userId as the key for fast access
    return { success: true, user };
};

/**
 * Adds a user to the unpaired users list.
 * Ensures no duplicate userId exists.
 */
const addUnpairedUser = (userId) => {
    if (unpairedUsers.has(userId)) {
        return { success: false, message: "User is already in the unpaired list." };
    }

    unpairedUsers.add(userId);
    return { success: true };
};

/**
 * Removes a user from the online users list by their socketId.
 */
const removeUser = (socketId) => {
    let userToRemove = null;

    // Loop through Map to find the user with the matching socketId
    for (let [userId, user] of onlineUsers) {
        if (user.socketId === socketId) {
            userToRemove = user;
            onlineUsers.delete(userId);  // Remove user by userId
            break;
        }
    }

    return userToRemove;
};

/**
 * Removes a user from the unpaired users list by their userId.
 */
const removeUnpairedUser = (userId) => {
    if (unpairedUsers.has(userId)) {
        unpairedUsers.delete(userId);  // Remove from Set
    }
};

/**
 * Gets a user object by their userId from the online users list.
 */
const getUser = (userId) => {
    return onlineUsers.get(userId) || null;  // Return user or null if not found
};

/**
 * Returns all online users.
 */
const getUsers = () => {
    return Array.from(onlineUsers.values());  // Convert Map values to array
};

/**
 * Returns all unpaired users.
 */
const getUnpairedUsers = () => {
    return Array.from(unpairedUsers);  // Convert Set to array
};

module.exports = {
    getUser,
    removeUser,
    addUser,
    getUsers,
    addUnpairedUser,
    getUnpairedUsers,
    removeUnpairedUser
};
