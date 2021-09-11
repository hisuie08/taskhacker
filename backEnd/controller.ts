import registry, { Registry } from "./registry";

class UserController {}

class ProjectController {}

class TaskController {}

export class MasterController {
  registry: Registry;
  user: UserController;
  project: ProjectController;
  task: TaskController;

  constructor() {
    this.registry = registry;
    this.user = new UserController();
    this.project = new ProjectController();
    this.task = new TaskController();
  }
}
