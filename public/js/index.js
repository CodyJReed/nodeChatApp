const socket = io();

socket.on("connect", function() {
  console.log("connected to server.");

  socket.emit("createMessage", {
    from: "Cody@udemy.com",
    text: "This is a test"
  });
});

socket.on("disconnect", function() {
  console.log("disconnected from server");
});

socket.on("newMessage", function(data) {
  console.log("New message", data);
});
