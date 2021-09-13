import registry from "./registry";
import { User, Project, Task } from "./dataclass";
import { createUUID, now } from "./utils";
import { UserException } from "./exceptions";
class UserController {
  register(name: string, passwd: string): User | null {
    const id: number = createUUID();
    const user: User = new User(id, name, passwd);
    for (const u of registry.users.values()) {
      if (u.name === name) {
        throw new UserException("User already exists");
      }
    }
    registry.users.set(id, user);
    return this.get(id) !== null ? this.get(id)! : null;
  }

  get(id: number): User | null {
      return registry.users.get(id) != void 0
        ? registry.users.get(id)!
        : null;
  }
  auth(name: string, passwd: string): User | null {
    for (const user of registry.users.values()) {
      if (user.name === name && user.passwd === passwd) {
        return user;
      }
    }
    return null;
  }
  update(
    id: number,
    name: string | null = null,
    passwd: string | null = null
  ): User | null {
    const user = this.get(id) !== null ? this.get(id)! : null;
    if (user !== null) {
      if (name !== null) {
        user.name = name;
      }
      if (passwd !== null) user.passwd = passwd;
      registry.users.set(id, user);
      return user;
    }
    return null;
  }
  unregister(id: number): void {
    registry.users.delete(id);
  }
}

class ProjectController {
  register(
    name: string,
    owner: number,
    description: string | null
  ): Project | null {
    const id: number = createUUID();
    const project: Project = new Project(
      id,
      name,
      owner,
      now(),
      description || null
    );
    registry.projects.set(id, project);
    return this.get(id) !== null ? this.get(id)! : null;
  }
  get(id: number): Project | null {
    return registry.projects.get(id) != void 0
        ? (registry.projects.get(id) as Project)
        : null;
  }
  getAll(): Array<Project> {
    const result = new Array<Project>();
    for (const project of registry.projects.values()) result.push(project);
    return result;
  }
  getSlaves(id: number): Array<Task> {
let result = new Array<Task>();
    for (const task of registry.tasks.values()) {
      if (task.project === id) result.push(task);
    }
    return result;
  }
  delete(id: number): void {
    registry.projects.delete(id);
  }
}


export class MasterController {
  user: UserController;
  project: ProjectController;

  constructor() {
    this.user = new UserController();
    this.project = new ProjectController();
  }
}
export default new MasterController();
