const [UserController, ProjectController, TaskController]
  = [require("./userController")
    , require("./projectController")
    , require("./taskController")]

class Controller {
  constructor() {
    this.user = new UserController();
    this.project = new ProjectController();
    this.task = new TaskController();
  }
}
module.exports = new Controller();
