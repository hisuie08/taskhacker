import { User, Project, Task } from "./dataclass";
export class Registry {
  users: Map<number, User>;
  projects: Map<number, Project>;
  tasks: Map<number, Task>;
  constructor() {
    this.users = new Map<number, User>();
    this.projects = new Map<number, Project>();
    this.tasks = new Map<number, Task>();
  }
}
export default new Registry();
