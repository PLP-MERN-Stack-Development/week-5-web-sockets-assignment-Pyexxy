const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    socket.on("joinRoom", (roomName) => {
      socket.join(roomName);
      socket.to(roomName).emit("message", { user: "system", text: `User joined ${roomName}` });
    });

    socket.on("sendMessage", ({ roomName, message, username }) => {
      io.to(roomName).emit("message", {
        user: username,
        text: message,
      });
    });

    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });
};

module.exports = {
  socketHandler
};
