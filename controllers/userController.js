const registry = require("../backEnd/registry");
const User = require("../backEnd/dataclass").User
const exception = require("./exceptions")
class UserController {
  register(name, passwd) {
    const id = createUUID();
    const user = new User(id, name, passwd);
    for (let u of registry.users.entries()) {
      if (u.name === name) {
        throw new exception.UserException("User already exists");
      }
    }
    registry.users.set(id,user);
    return this.get(id)
    }
    
  get(id = null, name = null) {
    const find = (name) => {
      for (let u of registry.users.values()) {
        if (u.name === name) {
          return Number(u.id);
        }
      }
    }
    const userId = id || find(name);
    if (userId == void 0) {
      throw new exception.UserException("User not found");
    } else {
        const user = registry.users.get(userId);
        return new User(userId,user.name,user.passwd);
    }
  }

  auth(name, passwd) {
    const user = this.get(null,name);
    if (user.passwd === passwd) {
      return user;
    }
    throw new exception.UserException("Invalid name or password");
  }

  unregister(name, passwd) {
    if (this.auth(name, passwd)) {
        const user = this.get(null,name);
        if (user.name === name && user.passwd === passwd) {
      registry.users.delete(this.get(user.id).id);}
    }
  }
}

module.exports = UserController