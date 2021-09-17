import * as express from "express";
import controller from "./controller";
const app: express.Application = express();
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, access_token'
  )
}
app.use(allowCrossDomain)
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const MissingParam = (params: Array<Object>, res: express.Response) => {
    let newParams:Array<string> = params.map(x=>Object.keys(x)[0])
    return res.contentType("application/json").status(400).json({ message: "Missing params:" + newParams })
}
//TODO: ユーザー認証

app.post("/api/user/login", (req: express.Request, res: express.Response) => {
    const name: string = req.body.name as string | undefined
    const passwd: string = req.body.passwd as string | undefined
    try {
        const user = controller.user.login(name, passwd)
        res.json({ success: true, auth: user.id! })
    } catch (e) {
        res.json({success:false,auth:0})
    }
})
app.post("/api/user/register", (req: express.Request, res: express.Response) => {
    const name: string = req.query.name as string | undefined
    const passwd: string = req.query.passwd as string | undefined
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

/**
 * Userのユーザーがメンバーになっている全プロジェクトを取るAPI
 */
app.get("/project/all", (req: express.Request, res: express.Response) => {
    const userID: number = req.query.userID != void 0 ? Number(req.query.userID as string) : null
    if (userID!==null) MissingParam([{ userID }], res)
    else res.json({uuid:userID})
    
    
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

app.listen(3020,"127.0.0.1", () => {console.log("server starting on http://localhost:3020") })