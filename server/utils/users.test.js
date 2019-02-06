const expect = require("expect");

const { Users } = require("./users");

describe("Users", () => {
  let users;
  let rooms;

  beforeEach(() => {
    users = new Users();
    users.rooms = [];
    users.users = [
      {
        id: "1",
        name: "Test",
        room: "room"
      },
      {
        id: "2",
        name: "Test-A",
        room: "room-2"
      },
      {
        id: "3",
        name: "Test-B",
        room: "room"
      }
    ];
  });

  it("should add a new user", () => {
    const users = new Users();
    const user = {
      id: "123",
      name: "test",
      room: "room"
    };
    const res = users.addUser(user.id, user.name, user.room);
    expect(users.users.length).toEqual(1);
    expect(users.users).toEqual([user]);
  });

  it("should return names in room", () => {
    const res = users.getUserList("room");
    expect(res.length).toEqual(2);
    expect(res).toEqual(["Test", "Test-B"]);
  });

  it("should return names in room-2", () => {
    const res = users.getUserList("room-2");
    expect(res.length).toEqual(1);
    expect(res).toEqual(["Test-A"]);
  });

  it("should remove a user ", () => {
    const userId = "2";
    const user = users.removeUser(userId);

    expect(user.id).toEqual(userId);
    expect(users.users.length).toEqual(2);
  });

  it("should not remove a user", () => {
    const userId = "0";
    const user = users.removeUser(userId);

    expect(user).toEqual(undefined);
    expect(users.users.length).toEqual(3);
  });

  it("should find a user", () => {
    const userId = "2";
    const user = users.getUser(userId);

    expect(user.id).toEqual(userId);
  });

  it("should not find a user", () => {
    const userId = "0";
    const user = users.getUser(userId);

    expect(user).toBeFalsy();
    expect(user).toEqual(undefined);
  });

  it("should return a group of user rooms", () => {
    const res = users.getUserRooms();
    expect(res.length).toEqual(2);
  });

  it("should add a new user room to the rooms array", () => {
    const user = {
      id: "123",
      name: "Phillip",
      room: "test-3"
    };
    users.addRoom(user.room);
    expect(users.rooms.length).toEqual(1);
    expect(users.rooms).toEqual(["test-3"]);
  });

  it("should remove an occupied room from the rooms array", () => {
    const userToRemove = users.users.find(user => user.id === "2");
    const user = users.removeUser(userToRemove.id);
    users.removeRoom(user.room);
    let group = users.getUserRooms();
    expect(group.length).toEqual(1);
  });

  it("should not remove a room if occupied by a user", () => {
    const userToRemove = users.users.find(user => user.id === "1");
    const user = users.removeUser(userToRemove.id);
    users.removeRoom(user.room);
    let group = users.getUserRooms();
    expect(users.users.length).toEqual(2);
    expect(group.length).toEqual(2);
  });
});
