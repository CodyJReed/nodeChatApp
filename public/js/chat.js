const socket = io();

function scrollToBottom() {
  // Selectors
  const messages = $("#messages");
  const newMessage = messages.children("li:last-child");
  // Heights
  const clientHeight = messages.prop("clientHeight");
  const scrollTop = messages.prop("scrollTop");
  const scrollHeight = messages.prop("scrollHeight");
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on("connect", function() {
  const params = $.deparam(window.location.search);

  socket.emit("join", params, function(err) {
    if (err) {
      alert(err);
      window.location.href = "/";
    } else {
      console.log("no error");
    }
  });
});

socket.on("disconnect", function() {
  console.log("disconnected from server");
});

socket.on("updateUserList", function(users) {
  const ol = $("<ol></ol>");

  users.forEach(function(user) {
    ol.append($("<li></li>").text(user));
  });

  $("#users").html(ol);
});

socket.on("newMessage", function(data) {
  const formattedTime = moment(data.createdAt).format("h:mm a");
  const template = $("#message-template").html();
  const html = Mustache.render(template, {
    text: data.text,
    from: data.from,
    createdAt: formattedTime
  });

  $("#messages").append(html);
  scrollToBottom();

  // const li = $("<li></li>");
  // li.text(`${data.from} ${formattedTime}: ${data.text}`);
  //
  // $("#messages").append(li);
});

socket.on("newLocationMessage", function(data) {
  const formattedTime = moment(data.createdAt).format("h:mm a");
  const li = $("<li></li>");
  const a = $("<a target ='_blank'>My current location</a>");

  li.text(`${data.from} ${formattedTime}: `);
  a.attr("href", data.url);
  li.append(a);

  $("#messages").append(li);
  scrollToBottom();
});

const msgFrm = $("#message-form").on("submit", function(e) {
  e.preventDefault();
  const msgTextBox = $("[name=message]");

  socket.emit(
    "createMessage",
    {
      text: msgTextBox.val()
    },
    function() {
      msgTextBox.val("");
    }
  );
});

const locationButton = $("#send-location");

locationButton.on("click", function(e) {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser.");
  }

  locationButton.attr("disabled", "disabled").text("Sending location...");

  navigator.geolocation.getCurrentPosition(
    function(position) {
      locationButton.removeAttr("disabled").text("Send location");
      console.log(position);
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      locationButton.removeAttr("disabled").text("Send location");
      alert("Unable to fetch location.");
    }
  );
});
