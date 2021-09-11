import express from "express"
const app = express();



app.get('/api/info', (_req: any, res: { json: (arg0: { name: string; version: string; }) => void; }) => {
    const data = { name: "TaskHacker", version: "1.0.0" }
    res.json(data);
})

app.post("/api/user/register", (req: { query: any; }, res: { json: (arg0: { name: any; }) => void; }) => {
    const param = req.query
    res.json({name:param.name})
})

app.listen(3000, () => console.log('Listening on port 3000'));