from sqlalchemy.engine.create import create_engine
from sqlalchemy.orm.session import sessionmaker
from sqlalchemy.types import DATETIME, Integer, String
from sqlalchemy.sql.schema import Column
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from random import randint
from enum import Enum


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


def createUUID():
    return int(str(int(datetime.timestamp(datetime.now())))+str(randint(0, 999)))


def getNow():
    return datetime.now()


class Project:
    """
    Projectクラスは配下に持つTaskを格納するslaveプロパティを持ち
    Taskのグルーピングを主な目的とする。
    Taskも自身のプロパティに親となるProjectのidを持ち、相互に連携する
    """

    def __init__(self, session, id=None, name=None, owner=None, description=None, slaves=[]):
        self.session = session
        self.id = id
        self.name = name
        self.owner = owner
        self.description = description
        self.slaves = slaves


class Priority(Enum):
    LOW = 0
    MEDIUM = 1
    HIGH = 2
    ASAP = 3


class Status(Enum):
    WAITING = 0
    WORKING = 1
    PENDING = 2
    COMPLETED = 3
    DISCONTINUED = 4


class Task:
    """
    Taskは最も重要な概念クラス。
    Project配下に属し、作成日、進行状況等を保持・更新する。
    """

    def __init__(self, session, id=None, name=None, status=None, priority=None, created_at=None,
                 updated_at=None, deadline=None, memo=None, project=None):
        self.session = session
        self.id = id
        self.name = name
        self.status = status
        self.priority = priority
        self.created_at = created_at
        self.updated_at = updated_at
        self.deadline = deadline
        self.memo = memo
        self.project = project


class User:
    """
    ユーザークラス。登録、認証、退会等ユーザー管理を統括する
    """

    def __init__(self, session, id=None, name=None, passwd=None):
        self.session = session
        self.id = id
        self.name = name
        self.passwd = passwd
        # TODO マルチユーザーを想定しているため後々権限プロパティも生やす
        # TODO パスワード平文を何とかする


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
