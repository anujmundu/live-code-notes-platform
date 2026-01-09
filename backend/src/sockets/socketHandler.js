const CodeNote = require("../models/CodeNote");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-note", ({ noteId }) => {
      socket.join(noteId);
      console.log(`Socket ${socket.id} joined note ${noteId}`);
    });
    socket.on("code-update", async ({ noteId, content }) => {
      socket.to(noteId).emit("code-sync", { content });
      try {
        await CodeNote.findByIdAndUpdate(noteId, {
          content,
          updatedAt: new Date()
        });
      } catch (err) {
        console.error("Failed to save code update");
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
