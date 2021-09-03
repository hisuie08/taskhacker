import os
from fastapi import FastAPI, Query
import uvicorn
from internal import *
PATH = os.path.dirname(os.path.abspath(__file__))
app = FastAPI()


@app.get("/")
async def hello():
    return {"text": "hello world!"}


@app.get("/user/register")
async def register(id: int, name: str, passwd: str):
    return {"id": id, "name": name, "passwd": passwd}

user = User()
user.register("kp", "pass")
