import { User, Project, Task } from "./dataclass"
import { createUUID, now, UserException, ProjectException, TaskException } from "./utils"
import registry from "./registry"

class UserController{
    login(name: string, passwd: string) {
        try {
            const user = User.auth(name, passwd)
            return { message: "success", userID: user.id!, name:user.name! }
        } catch (e) {
            return {message:"failed"}
        }
    }
}

class MasterController{
    user: UserController
    constructor() {
        registry.load(__dirname+"/../data")
        this.user = new UserController()
    }
}

export default new MasterController()