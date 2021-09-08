const e = require("express");
const registry = require("./registry");

const [dataclass, utils] = [require("./dataclass"), require("./utils")];
const [User, Project, Task, createUUID, now] = [
  dataclass.User,
  dataclass.Project,
  dataclass.Task,
  utils.createUUID,
  utils.now,
];

class UserException extends Error {}

class UserController {
  register(name, passwd) {
    const id = createUUID();
    const user = new User(id, name, passwd);
    for (let u of registry.users.entries()) {
      if (u.name === name) {
        throw new UserException("User already exists");
      }
    }
    registry.users.set(id,user);
    return this.get(id)
    }
    
  get(id = null, name = null) {
    const find = (name) => {
      for (let u of registry.users) {
        if (u[1].name === name) {
          return Number(u[0]);
        }
      }
    }
    const userId = id || find(name);
    if (userId == void 0) {
      throw new UserException("User not found");
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
    throw new UserException("Invalid name or password");
  }

  unregister(name, passwd) {
    if (this.auth(name, passwd)) {
        const user = this.get(null,name);
        if (user.name === name && user.passwd === passwd) {
      registry.users.delete(this.get(user.id).id);}
    }
  }
}
class ProjectController {
    register(name, owner, description = null) {
        const id = createUUID()
        const pr = new Project(id, name, owner, now(), description)
        registry.projects.set(id, pr)
        return this.get(id)
    }

    get(id) {
        const p = registry.projects.get(id)
        const slaves = new TaskController().getByProject(id)
        return new Project(p.id,p.name,p.owner,p.created_at,p.description,slaves)
    }
}
class TaskController {
    register() { }
    getByProject(id) {
        let result = []
        for (let t of registry.tasks.values()) {
            if (t.project === id) {
                result.push(t)
            }
        }
        return result
    }
}

class Controller {
  constructor() {
    this.user = new UserController();
    this.project = new ProjectController();
    this.task = new TaskController();
  }
}
module.exports = new Controller();
