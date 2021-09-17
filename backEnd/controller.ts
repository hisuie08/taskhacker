import { User, Project, Task } from "./dataclass";
import {
  createUUID,
  now,
  UserException,
  ProjectException,
  TaskException,
} from "./utils";
import registry from "./registry";

class UserController {
  login(name: string, passwd: string) {
    try {
      return User.auth(name, passwd); 
    } catch (e) {
      throw e;
    }
  }
  register(name: string, passwd: string) {
    try {
      return User.register(name, passwd);
    } catch (e) {
      throw e;
    }
  }
}

class MasterController {
  user: UserController;
  constructor() {
    registry.load(__dirname + "/data");
    this.user = new UserController();
  }
}

export default new MasterController();
