const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage } = require("./utils/message");
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("User connected");

  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the chat app.")
  );

  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New User joined")
  );

  socket.on("createMessage", msg => {
    console.log("createMessage", msg);
    io.emit("newMessage", generateMessage(msg.from, msg.text));
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
