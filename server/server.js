const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage, generateLocation } = require("./utils/message");
const { isRealString } = require("./utils/validation");
const { Users } = require("./utils/users");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on("connection", socket => {
  socket.on("join", (params, cb) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return cb("Name and room name are required");
    }
    let userList = users.getUserList(params.room);
    userList.forEach(user => {
      if (user === params.name) {
        return cb("Choose another display name");
      }
    });
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit("updateUserList", users.getUserList(params.room));
    socket.emit(
      "newMessage",
      generateMessage("Admin", `Welcome to the chat app ${params.name}.`)
    );

    socket.broadcast
      .to(params.room)
      .emit(
        "newMessage",
        generateMessage("Admin", `${params.name} has joined`)
      );
    cb();
  });

  socket.on("createMessage", (msg, cb) => {
    const user = users.getUser(socket.id);

    if (user && isRealString(msg.text)) {
      io.to(user.room).emit("newMessage", generateMessage(user.name, msg.text));
    }

    cb();
  });

  socket.on("createLocationMessage", data => {
    const user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "newLocationMessage",
        generateLocation(`${user.name}`, `${data.latitude}, ${data.longitude}`)
      );
    }
  });

  socket.on("disconnect", params => {
    const user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("updateUserList", users.getUserList(user.room));
      io.to(user.room).emit(
        "newMessage",
        generateMessage("Admin", `${user.name} has left.`)
      );
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
