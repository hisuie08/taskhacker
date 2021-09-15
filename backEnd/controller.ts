import { User, Project, Task } from "./dataclass";
import {
  createUUID,
  now,
  UserException,
  ProjectException,
  TaskException,
} from "./utils";
import { Request, Response } from "express";


export class UserController {
  register = User.register;
  get = User.get;
  getAll = User.getAll;
  auth = User.auth;
}
export class ProjectController {
  register = Project.register;
  get = Project.get;
  getAll = Project.getAll;
}
export class TaskController {
  get = Task.get;
  getAll = Task.getAll;
}

class MasterController {
  user: UserController = new UserController();
  project: ProjectController = new ProjectController();
  task: TaskController = new TaskController();
}

export default new MasterController();
