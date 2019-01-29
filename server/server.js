const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("User connected");

  socket.emit("newMessage", {
    from: "Andrew@udemy.com",
    text: "Hey. This is what we'd expect; and that is perfect.",
    createdAt: 321
  });

  socket.on("createMessage", newMessage => {
    console.log("createMessage", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
