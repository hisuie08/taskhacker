import { UserException } from "./exceptions";
import registry from "./registry";
import { createUUID, now } from "./utils";

export class User {
  id: number;
  name: string;
  passwd: string;
  constructor(id: number, name: string, passwd: string) {
    this.id = id;
    this.name = name;
    this.passwd = passwd;
  }

}

export class Project {
  id: number;
  name: string;
  owner: number;
  created_at: number;
  description: string | null;
  slaves: Array<Task>;
  constructor(
    id: number,
    name: string,
    owner: number,
    created_at: number,
    description: string | null,
    slaves = []
  ) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.created_at = created_at;
    this.description = description || null;
    this.slaves = slaves;
  }

  static register(
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
    return registry.projects.get(id)!
  }
  static get(id: number): Project | null {
    return registry.projects.get(id) != void 0
      ? (registry.projects.get(id) as Project)
      : null;
  }
}

export enum Status {
  PENDING = 0,
  WORKING = 1,
  WAITING = 2,
  DONE = 3,
  DISCONTINUED = 4,
}

export enum Priority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
  ASAP = 3,
}
export class Task {
  id: number;
  name: string;
  status: Status;
  priority: Priority;
  created_at: number;
  updated_at: number;
  deadline: number | null;
  memo: string | null;
  project: number;
  constructor(
    id: number,
    name: string,
    status: Status,
    priority: Priority,
    created_at: number,
    updated_at: number,
    deadline: number | null,
    memo: string | null,
    project: number
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.priority = priority;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deadline = deadline || null;
    this.memo = memo || null;
    this.project = project;
  }
}
