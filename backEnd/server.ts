import express, { Application, Request, Response } from "express";
import controller from "./controller";
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//TODO: ユーザー認証

app.get("/user", (req: Request, res: Response) => {
    const name: string = req.query.name as string | undefined
    const passwd: string = req.query.passwd as string | undefined
    res.json(controller.user.auth(name, passwd))
})
app.post("/user", (req: Request, res: Response) => {
    const name: string = req.query.name as string | undefined
    const passwd: string = req.query.passwd as string | undefined
    res.json(controller.user.register(name, passwd))
})
app.put("/user", (req: Request, res: Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const name: string = req.query.name as string | undefined
    const passwd: string = req.query.passwd as string | undefined
})

app.delete("/user", (req: Request, res: Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const passwd: string = req.query.passwd as string | undefined
})

//TODO: プロジェクトのアクセス管理。パーミッションプロパティをProjectクラスに生やす？
app.get("/project", (req: Request, res: Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    res.json(controller.project.getAll())
})
app.post("/project", (req: Request, res: Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const name: string = req.query.name as string | undefined
    const owner: number = req.query.owner != void 0 ? Number(req.query.owner as string) : null
    const description: string = req.query.description as string || null
})

app.get("/project/:projectID", (req: Request, res: Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const projectID: number = req.params.projectID != void 0 ? Number(req.params.projectID as string) : null
    res.json(controller.project.get(projectID))
})
app.put("/project/:projectID", (req: Request, res: Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const projectID: number = req.params.projectID != void 0 ? Number(req.params.projectID as string) : null
    const projectName: string = req.query.name as string | undefined
    const owner: number = req.query.owner != void 0 ? Number(req.query.owner as string) : null
    const description: string = req.query.description as string || null
})
app.delete("/project/:projectID", (req: Request, res: Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const projectID: number = req.params.projectID != void 0 ? Number(req.params.projectID as string) : null
})

app.get("/project/:projectID/task", (req: Request, res: Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const projectID: number = req.params.projectID != void 0 ? Number(req.params.projectID as string) : null
})
app.post("/project/:projectID/task", (req: Request, res: Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const projectID: number = req.params.projectID != void 0 ? Number(req.params.projectID as string) : null
})

app.get("/project/:projectID/task/:taskID", (req: Request, res: Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const projectID: number = req.params.projectID != void 0 ? Number(req.params.projectID as string) : null
})
app.put("/project/:projectID/task/:taskID", (req: Request, res: Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const projectID: number = req.params.projectID != void 0 ? Number(req.params.projectID as string) : null
})
app.delete("/project/:projectID/task/:taskID", (req: Request, res: Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    const projectID: number = req.params.projectID != void 0 ? Number(req.params.projectID as string) : null
})