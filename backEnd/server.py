import os
from fastapi import FastAPI, Query
from pydantic import BaseModel
import uvicorn
from dbControll import Controller
app = FastAPI()

controller = Controller()


@app.get("/")
async def hello():
    return {"text": "hello world!"}


class ReqUser(BaseModel):
    name: str
    passwd: str


@app.post("/user/register")
def register(data: ReqUser):
    print(data)
    user = controller.userController.register(data.name, data.passwd)
    return {"id": user.id, "name": user.name, "passwd": user.passwd}


uvicorn.run(app)
