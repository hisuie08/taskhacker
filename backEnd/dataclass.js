const utils = require("./utils");

class User {
  constructor(id = null, name = null, passwd = null) {
    this.id = id;
    this.name = name;
    this.passwd = passwd;
  }
}
class Project {
  constructor(
    id = null,
    name = null,
    owner = null,
    created_at = null,
    description = null,
    slaves = []
  ) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.created_at = created_at;
    this.description = description;
    this.slaves = slaves;
  }
}
class Task {
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
    this.id = id;
    this.name = name;
    this.status = status;
    this.priority = priority;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deadline = deadline;
    this.memo = memo;
    this.project = project;
  }
}

module.exports = { User: User, Project: Project, Task: Task };
