import {User,Project,Task} from "./dataclass"
export class Registry {
  users: Map<number, typeof User>
  projects: Map<number, typeof Project>
  tasks: Map<number, typeof Task>
  constructor() {
    this.users = new Map<number, typeof User>();
    this.projects = new Map<number, typeof Project>();
    this.tasks = new Map<number, typeof Task>();
  }
}
export const registry: Registry = new Registry()
export default registry