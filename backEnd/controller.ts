import registry, { Registry } from "./registry";
import { User, Project, Task } from "./dataclass";
import { createUUID, now } from "./utils";
import { UserException } from "./exceptions";
class UserController {
  register(name: string, passwd: string) {
    const id: number = createUUID();
    const user = new User(id, name, passwd);
    for (const u of registry.users.values()) {
      if (u.name === name) {
        throw new UserException("User already exists");
      }
    }
    registry.users.set(id, user);
    return this.get(id)
  }
    get(key: number | string):User {
        if (typeof key === "number") {
          return registry.users.get(key)
        }
        else {
            for (const user of registry.users.values()) {
                if (user.name === key) {
                    return user
                }
            }
        }
        throw new UserException("User not found")
    }
    auth(name: string, passwd: string):User {
        for (const user of registry.users.values()) {
            if (user.name === name && user.passwd === passwd) {
                return user
            }
        }
    }
    update(id: number,name: string | null, passwd: string | null) {
        const user = this.get(id)
        if (name != void 0) user.name = name
        if (passwd != void 0) user.passwd = passwd
        registry.users.set(id,user)
        
    }
    unregister(id: number):void {
        registry.users.delete(id)
    }
}

class ProjectController {}

class TaskController {}

export class MasterController {
  user: UserController;
  project: ProjectController;
  task: TaskController;

  constructor() {
    this.user = new UserController();
    this.project = new ProjectController();
    this.task = new TaskController();
  }
}

console.log(typeof "");
