from sqlalchemy.engine.create import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql.schema import Column
from sqlalchemy.types import DATETIME, Integer, String
from sqlalchemy.orm.session import sessionmaker
from dataclasses import User, Project, Task


class Singleton(object):
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, "_instance"):
            cls._instance = super(Singleton, cls).__new__(cls)
        return cls._instance


engine = create_engine(f"sqlite:///taskhacker.db")
Base = declarative_base()
Base.metadata.create_all(engine)


class UserTable(Base):
    """
    DBテーブルモデルクラス
    """
    __tablename__ = "User"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    passwd = Column(String)


class ProjectTable(Base):
    """
    DBテーブルモデルクラス
    """
    __tablename__ = "Project"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    owner = Column(String)
    description = Column(String, nullable=True)


class TaskTable(Base):
    """
    DBテーブルモデルクラス
    """
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


class Controller:
    """
    APIからのリクエストを元にDBを参照しながら処理を行う中央集権クラス
    """

    def __init__(self):
        self.session = sessionmaker(bind=engine)
        self.userController = User(self.session)
        self.projectController = Project(self.session)
        self.taskController = Task(self.session)

    def engage(self):
        return
