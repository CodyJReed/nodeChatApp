const socket = io();

socket.on("connect", function() {
  socket.emit("requestAvailableRooms");
});

socket.on("availableRooms", function(rooms) {
  if (rooms.length > 0) {
    const span = $("<span class='available-rooms'></span>");
    const select = $("<select name='options'></select>");

    select.append(
      $("<option disabled selected></option>").text("Please make a selection.")
    );
    rooms.forEach(function(room) {
      select.append($(`<option value=${room}></option`).text(room));
    });

    span.append($("<label for='options'></label>").text("Active rooms"));
    span.append(select);
    $("#available-chat-rooms").html(span);
  } else {
    $("#available-chat-rooms")
      .children()
      .remove();
  }
});

const roomField = $("#room-field");

roomField.on("keyup", e => {
  const rooms = $("#available-chat-rooms");
  if (roomField.val()) {
    const label = $("<label class='warning'></label>").text(
      "Active rooms disabled if entering a room name."
    );
    rooms.children().remove();
    rooms.append(label);
  } else {
    rooms.children().remove();
    socket.emit("requestAvailableRooms");
  }
});
