import { User, Project, Task } from "./controller";
import * as fs from "fs";
import { plainToClass } from "class-transformer";
import "reflect-metadata";
class Registry {
  users: Map<number, User>;
  projects: Map<number, Project>;
  tasks: Map<number, Task>;
  constructor() {
    this.users = new Map<number, User>();
    this.projects = new Map<number, Project>();
    this.tasks = new Map<number, Task>();
  }
  load(dirPath: string) {
    const userData = fs.readFileSync(dirPath + "/user.json", {
      encoding: "utf-8",
    });
    const userJson = [...JSON.parse(userData)];
    for (const user of userJson) {
      this.users.set(user["id"], plainToClass(User, user) as unknown as User);
    }
    const projectData = fs.readFileSync(dirPath + "/project.json", {
      encoding: "utf-8",
    });
    const projectJson = [...JSON.parse(projectData)];
    for (const project of projectJson) {
      this.projects.set(
        project["id"]!,
        plainToClass(Project, project) as unknown as Project
      );
    }
    const taskData = fs.readFileSync(dirPath + "/task.json", {
      encoding: "utf-8",
    });
    const taskJson = [...JSON.parse(taskData)];
    for (const task of taskJson) {
      this.tasks.set(task["id"], plainToClass(Task, task) as unknown as Task);
    }
  }
  dump(dirPath: string) {
    const [userData, projectData, taskData] = [
      JSON.stringify([...this.users.values()]),
      JSON.stringify([...this.projects.values()]),
      JSON.stringify([...this.tasks.values()]),
    ];
    fs.writeFile(dirPath + "/user.json", userData, (_) => {});
    fs.writeFile(dirPath + "/project.json", projectData, (_) => {});
    fs.writeFile(dirPath + "/task.json", taskData, (_) => {});
  }
}
export default new Registry();
