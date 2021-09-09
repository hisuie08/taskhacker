const registry = require("../backEnd/registry");

class ProjectController {
    register(name, owner, description = null) {
        const id = createUUID()
        const pr = new Project(id, name, owner, now(), description)
        registry.projects.set(id, pr)
        return this.get(id)
    }

    get(id) {
        const p = registry.projects.get(id)
        const slaves = new TaskController().getByProject(id)
      return new Project(
        p.id, p.name, p.owner, p.created_at, p.description, slaves)
  }
  delete(id) {
    registry.projects.delete(id)
  }
}

module.exports = ProjectController