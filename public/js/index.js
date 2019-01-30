const socket = io();

socket.on("connect", function() {
  console.log("connected to server.");
});

socket.on("disconnect", function() {
  console.log("disconnected from server");
});

socket.on("newMessage", function(data) {
  console.log("New message", data);
  const li = $("<li></li>");
  li.text(`${data.from}: ${data.text}`);

  $("#messages").append(li);
});

const msgFrm = $("#message-form").on("submit", function(e) {
  e.preventDefault();

  socket.emit(
    "createMessage",
    {
      from: "User",
      text: $("[name=message]").val()
    },
    function() {
      $("[name=message]").val("");
    }
  );
});
