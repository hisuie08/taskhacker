const { User, Project, Task } = require("../backEnd/dataclass");
const registry = require("../backEnd/registry");

class BaseController {
  constructor(type) {
    this.type = type;
  }
  get(id) {
    const data = registry[type].get(id);
    switch (this.type) {
      case "user":
        return new User(data.id, data.name, data.passwd);
      case "project":
        let result = [];
        for (let t of registry.tasks.values()) {
          if (t.project === id) {
            result.push(new Task());
          }
        }
        return new Project(
          data.id,
          data.name,
          data.owner,
          data.created_at,
          data.description
            )
      case "task":
        return new Task();
      }
  }
}
