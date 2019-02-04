const expect = require("expect");

const { Users } = require("./users");

describe("Users", () => {
  let users;

  beforeEach(() => {
    users = new Users();
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
});
