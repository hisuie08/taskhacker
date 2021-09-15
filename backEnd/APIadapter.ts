import { User, Project, Task } from "./dataclass";
import {
  createUUID,
  now,
  UserException,
  ProjectException,
  TaskException,
} from "./utils";
import { Request, Response } from "express";

/**
 * 各種Adapterクラスはexpress空回されたリクエストのパラメータをパースしてJsonを返す。
 */
enum StatusCode{
  OK = 200,
  BadRequest=400,
  Unauthorized=401,
  Forbidden = 403,
  NotFound = 404
}

class UserAdapter{
  login(req: Request, res: Response): void{
    const [name, passwd] = [req.query.name != void 0 ? req.query.name as string : null, req.query.passwd != void 0 ? req.query.passwd as string : null]
    try {
      const user = User.auth(name, passwd)
      res.status(200).json({success:true,user:JSON.stringify(user)})
    } catch (e) {
    }
  }
}
class ProjectAdapter{ }
class TaskAdapter{ }


class MasterAdapter {

}

export default new MasterAdapter();
