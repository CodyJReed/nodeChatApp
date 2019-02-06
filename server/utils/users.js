class Users {
  constructor() {
    this.users = [];
    this.rooms = [];
  }

  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    const user = this.getUser(id);

    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }
    return user;
  }

  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }

  getUserList(room) {
    const users = this.users.filter(user => user.room === room);
    const namesArray = users.map(user => user.name);

    return namesArray;
  }

  addRoom(room) {
    let a = this.rooms.find(e => e === room);
    if (!a || undefined) {
      this.rooms.push(room);
    }
  }

  removeRoom(user) {
    const users = this.getUserList(user);
    if (users.length <= 0) {
      return (this.rooms = this.rooms.filter(room => room !== user));
    }
  }

  getUserRooms() {
    if (this.users.length > 0) {
      let previousUsers = this.users;
      previousUsers.forEach(user => {
        this.addRoom(user.room);
      });
    }
    return this.rooms;
  }
}

module.exports = { Users };
