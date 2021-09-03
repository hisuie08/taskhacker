import os
from fastapi import FastAPI, Query
import uvicorn
from internal.User import User
from internal.database import DBInterface

PATH = os.path.dirname(os.path.abspath(__file__))
app = FastAPI()

db = DBInterface()


@app.get("/")
async def hello():
    return {"text": "hello world!"}


@app.get("/user/register")
async def register(id: int, name: str, passwd: str):
    return {"id": id, "name": name, "passwd": passwd}
