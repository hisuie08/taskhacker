const registry = require("../backEnd/registry");

class TaskController {
  register() { }
  get(id) {
    const t = registry.tasks.get(id)
    return new Task(id, t.name, t.status, t.priority, t.created_at,
      r.updated_at, t.deadline, t.memo, t.project)
  }

  delete(id) {
    registry.tasks.delete(id)
  }
}

module.exports = TaskController