abstract class BaseData {
  id: number|null
  name: string|null
  constructor(id = null, name = null) {
    this.id = id;
    this.name = name;
  }
}
export class User extends BaseData {
  passwd: string|null
  constructor(id = null, name = null, passwd = null) {
    super(id, name);
    this.passwd = passwd;
  }
}

export class Project extends BaseData {
  owner: number|null
  created_at: number|null
  description: string|null
  slaves: Array<Task>|null
  constructor(
    id = null,
    name = null,
    owner = null,
    created_at = null,
    description = null,
    slaves = []
  ) {
    super(id, name);
    this.owner = owner;
    this.created_at = created_at;
    this.description = description;
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
export class Task extends BaseData {
  status: Status|null
  priority: Priority|null
  created_at: number|null
  updated_at: number|null
  deadline: number|null
  memo: string|null
  project: number|null
  constructor(
    id = null,
    name = null,
    status = null,
    priority = null,
    created_at = null,
    updated_at = null,
    deadline = null,
    memo = null,
    project = null
  ) {
    super(id, name);
    this.status = status;
    this.priority = priority;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deadline = deadline;
    this.memo = memo;
    this.project = project;
  }
}
