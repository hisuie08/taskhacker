import * as express from "express";
import controller from "./controller";
const app: express.Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//TODO: ユーザー認証

app.get("/user", (req: express.Request, res: express.Response) => {
    const name: string = req.query.name as string | undefined
    const passwd: string = req.query.passwd as string | undefined
    res.json(controller.user.auth(name, passwd))
})
app.post("/user", (req: express.Request, res: express.Response) => {
    const name: string = req.query.name as string | undefined
    const passwd: string = req.query.passwd as string | undefined
    res.json(controller.user.register(name, passwd))
})
app.put("/user", (req: express.Request, res: express.Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const name: string = req.query.name as string | undefined
    const passwd: string = req.query.passwd as string | undefined
})

app.delete("/user", (req: express.Request, res: express.Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const passwd: string = req.query.passwd as string | undefined
})

//TODO: プロジェクトのアクセス管理。パーミッションプロパティをProjectクラスに生やす？
app.get("/project", (req: express.Request, res: express.Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    res.json(controller.project.getAll())
})
app.post("/project", (req: express.Request, res: express.Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const name: string = req.query.name as string | undefined
    const owner: number = req.query.owner != void 0 ? Number(req.query.owner as string) : null
    const description: string = req.query.description as string || null
})

app.get("/project/:projectID", (req: express.Request, res: express.Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const projectID: number = req.params.projectID != void 0 ? Number(req.params.projectID as string) : null
    res.json(controller.project.get(projectID))
})
app.put("/project/:projectID", (req: express.Request, res: express.Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const projectID: number = req.params.projectID != void 0 ? Number(req.params.projectID as string) : null
    const projectName: string = req.query.name as string | undefined
    const owner: number = req.query.owner != void 0 ? Number(req.query.owner as string) : null
    const description: string = req.query.description as string || null
})
app.delete("/project/:projectID", (req: express.Request, res: express.Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const projectID: number = req.params.projectID != void 0 ? Number(req.params.projectID as string) : null
})

app.get("/project/:projectID/task", (req: express.Request, res: express.Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const projectID: number = req.params.projectID != void 0 ? Number(req.params.projectID as string) : null
})
app.post("/project/:projectID/task", (req: express.Request, res: express.Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const projectID: number = req.params.projectID != void 0 ? Number(req.params.projectID as string) : null
})

app.get("/project/:projectID/task/:taskID", (req: express.Request, res: express.Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const projectID: number = req.params.projectID != void 0 ? Number(req.params.projectID as string) : null
})
app.put("/project/:projectID/task/:taskID", (req: express.Request, res: express.Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const projectID: number = req.params.projectID != void 0 ? Number(req.params.projectID as string) : null
})
app.delete("/project/:projectID/task/:taskID", (req: express.Request, res: express.Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const projectID: number = req.params.projectID != void 0 ? Number(req.params.projectID as string) : null
})