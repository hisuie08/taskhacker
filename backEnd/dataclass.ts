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
  description: string|null;
  slaves: Array<Task>;
  constructor(
    id: number,
    name: string,
    owner: number,
    created_at: number,
    description: string|null=null,
    slaves = []
  ) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.created_at = created_at;
    this.description = description || null;
    this.slaves = slaves;
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
  deadline: number|null;
  memo: string|null;
  project: number;
  constructor(
    id: number,
    name: string,
    status: Status,
    priority: Priority,
    created_at: number,
    updated_at: number,
    deadline: number|null,
    memo: string|null,
    project: number
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.priority = priority;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deadline = deadline||null;
    this.memo = memo||null;
    this.project = project;
  }
}
