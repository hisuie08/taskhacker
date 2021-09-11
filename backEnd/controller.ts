import registry, { Registry } from "./registry";
import { User, Project, Task } from "./dataclass";
import { createUUID, now } from "./utils";
import { UserException } from "./exceptions";
class UserController {
  register(name: string, passwd: string): User{
    const id: number = createUUID();
    const user:User = new User(id, name, passwd);
    for (const u of registry.users.values()) {
      if (u.name === name) {
        throw new UserException("User already exists");
      }
    }
    registry.users.set(id, user);
    return this.get(id);
  }
  get(key: number | string): User {
    if (typeof key === "number") {
      return registry.users.get(key);
    } else {
      for (const user of registry.users.values()) {
        if (user.name === key) {
          return user;
        }
      }
    }
    throw new UserException("User not found");
  }
  auth(name: string, passwd: string): User {
    for (const user of registry.users.values()) {
      if (user.name === name && user.passwd === passwd) {
        return user;
      }
    }
  }
  update(id: number, name: string | null, passwd: string | null) {
    const user = this.get(id);
    if (name != void 0) user.name = name;
    if (passwd != void 0) user.passwd = passwd;
    registry.users.set(id, user);
  }
  unregister(id: number): void {
    registry.users.delete(id);
  }
}

class ProjectController {
  register(name: string, owner: number, description: string | null):Project {
    const id: number = createUUID()
    const project: Project = new Project(id, name, owner, now(), description || null)
    registry.projects.set(id,project)
    return this.get(id)
  }
  get(id: number):Project {
    const p = registry.projects.get(id)
    const slaves = new TaskController().getByProject(id)
    return new Project(p.id,p.name,p.owner,p.created_at,p.description,slaves)
  }
  delete(id: number):void {
    registry.projects.delete(id)
  }
}

class TaskController {
  register() {
    
  }
  getByProject(id: number) {
    let result = new Array<Task>()
    for (const task of registry.tasks.values()) {
      if(task.project===id)result.push(task)
    }
    return result
  }
}

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
