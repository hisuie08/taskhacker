const express = require('express');
const app = express();

const controller = require("./controller")


app.get('/api/info', (req, res) => {
    const data = { name: "TaskHacker", version: "1.0.0" }
    res.json(data);
})

app.post("/api/user/register", (req, res) => {
    const param = req.query
    res.json({name:param.name})
})

app.listen(3000, () => console.log('Listening on port 3000'));