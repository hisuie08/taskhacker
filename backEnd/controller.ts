import registry from "./registry";
import { createUUID, now } from "./utils";
import { ProjectException, TaskException, UserException } from "./exceptions";
import { Type } from "class-transformer";
import 'reflect-metadata';
export class User {
  id?: number | null;
  name?: string | null;
  passwd?: string | null;
  constructor(
    id: number | null = null,
    name: string | null = null,
    passwd: string | null = null
  ) {
    if (id !== null && name === null && passwd === null) return User.get(id);
    this.id = id;
    this.name = name;
    this.passwd = passwd;
  }
  static getAll(): Array<User> {
    const result = [];
    for (const user of registry.users.values()) {
      result.push(user);
    }
    return result;
  }
  static auth(name: string, passwd: string): User {
    for (const user of registry.users.values()) {
      if (user.name === name && user.passwd === passwd) {
        return user;
      }
    }
    throw new UserException("Invalid username or password");
  }
  static register(name: string, passwd: string): User {
    const id = createUUID();
    //TODO: passwd平文なんとかする
    const user = new User(id, name, passwd);
    for (const u of registry.users.values()) {
      if (u.name === name) throw new UserException("User already exists");
    }
    registry.users.set(id, user);
    return User.get(id)!;
  }
  static get(id: number): User {
    if (registry.users.has(id)) return registry.users.get(id)!;
    else throw new UserException("User not found:" + id);
  }
  changePassword(currentPW: string, newPW: string) {
    if (this.passwd === currentPW) {
      this.passwd = newPW;
      registry.users.set(this.id!, this);
      return User.get(this.id!)!;
    } else {
      throw new UserException("Invalid password");
    }
  }
  unregister(passwd: string): void {
    if (this.passwd === passwd) registry.users.delete(this.id!);
  }
}

export class Project {
  id?: number | null;
  name?: string | null;
  owner?: User | null;
  created_at?: number | null;
  description?: string | null;
  @Type(()=>User)
  members!: User[];
  @Type(()=>Task)
  slaves!: Task[];
  constructor(
    id: number | null = null,
    name: string | null = null,
    owner: User | null = null,
    created_at: number | null = null,
    description: string | null = null,
    members: User[] =[],
    slaves: Task[] = []
  ) {
    if (id !== null && name === null && owner === null) return Project.get(id);
    this.id = id!;
    this.name = name;
    this.owner = owner;
    this.created_at = created_at;
    this.description = description || null;
    this.members = members;
    this.slaves = slaves;
  }
  static register(
    name: string,
    owner: User,
    description: string | null = null
  ): Project {
    const id = createUUID();
    const project = new Project(id, name, owner, now(), description,[],[]);
    project.members.push(owner);
    registry.projects.set(id, project);
    return Project.get(id)!;
  }
  modMember(type: number, target: number): Project {
    switch (type) {
      case 0:
        this.members = this.members.filter((m) => m !== User.get(target));
        break;
      case 1:
        this.members.push(User.get(target));
        break;
      case 10:
        this.owner = User.get(target);
        break;
    }
    registry.projects.set(this.id!, this);
    return Project.get(this.id!)! as Project;
  }
  static get(id: number): Project {
    if (registry.projects.has(id)) return registry.projects.get(id)!;
    else throw new ProjectException("Project not found: " + id);
  }
  static getAll(): Array<Project> {
    const result = new Array<Project>();
    for (const project of registry.projects.values()) result.push(project);
    return result;
  }
  getTask(id: number) {
    for (const task of this.getSlaves()) {
      if (task.id === id) {
        return task
      }
    }throw new TaskException("Task not found:" + id)
  }
  updateName(name: string): Project {
    this.name = name;
    registry.projects.set(this.id!, this);
    return Project.get(this.id!)! as Project;
  }
  updateDescription(description: string): Project {
    this.description = description;
    registry.projects.set(this.id!, this);
    return Project.get(this.id!)! as Project;
  }
  getSlaves(): Array<Task> {
    let result = new Array<Task>();
    for (const task of registry.tasks.values()) {
      if (task.project === this.id!) result.push(task);
    }
    return result;
  }
  addTask(task: Task) {
    registry.tasks.set(task.id!, task);
    this.slaves = this.getSlaves();
    return this as Project;
  }
  delete() {
    registry.projects.delete(this.id!);
  }
}

export enum Status {
  PENDING,
  WORKING,
  WAITING,
  DONE,
  DISCONTINUED,
}

export enum Priority {
  LOW,
  MEDIUM,
  HIGH,
  ASAP,
}

export class Task {
  id?: number | null;
  name?: string | null;
  project?: number | null;
  status?: Status | null;
  priority?: Priority | null;
  created_at?: number | null;
  updated_at?: number | null;
  deadline?: number | null;
  memo?: string | null;
  constructor(
    id: number | null = null,
    name: string | null = null,
    project: number | null = null,
    status: Status | null = null,
    priority: Priority | null = null,
    created_at: number | null = null,
    updated_at: number | null = null,
    deadline: number | null = null,
    memo: string | null = null
  ) {
    if (id !== null && name === null && status === null) return Task.get(id);
    this.id = id;
    this.name = name;
    this.project = project;
    this.status = status;
    this.priority = priority;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deadline = deadline;
    this.memo = memo;
  }

  static register(
    name: string,
    project: number,
    status: Status,
    priority: Priority,
    deadline: number,
    memo: string | null = null
  ) {
    const id = createUUID();
    const task = new Task(
      id,
      name,
      project,
      status,
      priority,
      now(),
      now(),
      deadline,
      memo
    );
    registry.tasks.set(id, task);
    return Task.get(id);
  }
  static get(id: number): Task {
    if (registry.tasks.has(id)) return registry.tasks.get(id)!;
    else throw new TaskException("Task not found: " + id);
  }
  static getAll(): Array<Task> {
    const result = [];
    for (const task of registry.tasks.values()) {
      result.push(task);
    }
    return result;
  }
  update(
    status: Status | null = null,
    priority: Priority | null = null,
    deadline: number | null = null,
    memo: string | null = null
  ): Task {
    if (status !== null) this.status! = status;
    if (priority !== null) this.priority! = priority;
    if (deadline !== null) this.deadline! = deadline;
    if (memo !== null) this.memo! = memo;
    registry.tasks.set(this.id!, this);
    this.updated_at = now();
    return Task.get(this.id!)! as Task;
  }
  delete() {
    registry.tasks.delete(this.id!);
  }
}

class UserController {
  register = User.register;
  get = User.get;
  getAll = User.getAll;
  auth = User.auth;
}
class ProjectController {
  register = Project.register;
  get = Project.get;
  getAll = Project.getAll;
}
class TaskController {
  get = Task.get;
  getAll = Task.getAll;
}

export class MasterController {
  user = new UserController();
  project = new ProjectController();
  task = new TaskController();
}

export default new MasterController();
