from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DATETIME
from sqlalchemy.orm import sessionmaker, Session
from .utils import *

engine = create_engine(f"sqlite:///taskhacker.db")
Base = declarative_base()
Base.metadata.create_all(engine)


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
    priority = Column(Integer)
    created_at = Column(DATETIME)
    updated_at = Column(DATETIME)
    deadline = Column(DATETIME)
    project = Column(Integer)
    memo = Column(String, nullable=True)


class DBInterface(Singleton):
    """
    SQLITEとのセッションを提供するインターフェイス
    User,Task,Projectは全てこのシングルトンを介して機能する
    """

    def __init__(self):
        CSession = sessionmaker(bind=engine)
        self.session: Session = CSession()
