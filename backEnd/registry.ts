import { User, Project, Task, Status, Priority } from "./controller";
import fs from "fs";
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
    fs.readFile(dirPath + "/user.json", { encoding: "utf-8" }, (_, data) => {
      [...JSON.parse(data)].forEach((user) => {
        this.users.set(
          user["id"],
          new User(user["id"], user["name"], user["passwd"])
        );
      });
    });
    fs.readFile(dirPath + "/project.json", { encoding: "utf-8" }, (_, data) => {
      [...JSON.parse(data)].forEach((project) => {
        this.projects.set(
          project["id"],
          new Project(
            project["id"],
            project["name"],
            User.get(project["owner"]!),
            project["created_at"],
            project["description"],
            project["members"],project["slaves"]
          )
        );
      });
    });
    fs.readFile(dirPath + "/task.json", { encoding: "utf-8" }, (_, data) => {
      [...JSON.parse(data)].forEach((task) => {
        this.tasks.set(
          task["id"],
          new Task(
            task["id"],
            task["name"],
            task["project"],
            Status[Number(task["status"])] as unknown as Status,
            Priority[task["priority"]] as unknown as Priority,
            task["created_at"],
            task["updated_at"],
            task["deadline"],
            task["memo"]
          )
        );
      });
    });
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
