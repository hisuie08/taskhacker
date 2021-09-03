from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DATETIME, BOOLEAN
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from random import randint
import os

PATH = os.path.dirname(os.path.abspath(__file__))


def createUUID():
    return int(str(int(datetime.timestamp(datetime.now())))+str(randint(0, 999)))


def getNowTimeStamp():
    return int(datetime.timestamp(datetime.now()))


engine = create_engine(f"sqlite:///taskhacker.db")
Base = declarative_base()


class UserTable(Base):
    __tablename__ = "User"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    passwd = Column(String)


class ProjectTable(Base):
    __tablename__ = "Project"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    owner = Column(String)
    description = Column(String, nullable=True)


class TaskTable(Base):
    __tablename__ = "Task"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    status = Column(Integer)
    created_at = Column(DATETIME)
    updated_at = Column(DATETIME)
    deadline = Column(DATETIME)
    memo = Column(String, nullable=True)


class Singleton(object):
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, "_instance"):
            cls._instance = super(Singleton, cls).__new__(cls)
        return cls._instance


class DBInterface(Singleton):
    def __init__(self):
        self.engine = engine
        self.Base = Base
        Base.metadata.create_all(engine)
        Session = sessionmaker(bind=engine)
        self.session = Session()
