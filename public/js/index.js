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

socket.on("newLocationMessage", function(data) {
  const li = $("<li></li>");
  const a = $("<a target ='_blank'>My current location</a>");

  li.text(`${data.from}: `);
  a.attr("href", data.url);
  li.append(a);

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

const locationButton = $("#send-location");

locationButton.on("click", function(e) {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser.");
  }

  navigator.geolocation.getCurrentPosition(
    function(position) {
      console.log(position);
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      alert("Unable to fetch location.");
    }
  );
});
