from .database import *
from .utils import *
from datetime import datetime
from enum import Enum


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
    @classmethod
    def __session():
        return DBInterface().session

    def __init__(self, id=None, name=None, status=None, priority=None, created_at=None,
                 updated_at=None, deadline=None, memo=None, project=None):
        self.id = id
        self.name = name
        self.status = status
        self.priority = priority
        self.created_at = created_at
        self.updated_at = updated_at
        self.deadline = deadline
        self.memo = memo
        self.project = project

    @staticmethod
    def create(name, deadline, memo, project, status=0, priority=0):
        Task.__session.add(
            TaskTable(id=createUUID(), name=name, status=status.value,
                      priority=priority.value, deadline=deadline, memo=memo, project=project))
        Task.__session.commit()
        return

    def update(self, name=None, status=None, priority=None, deadline=None, memo=None, project=None):
        target = Task.__session.query(TaskTable).filter_by(id=self.id)
        target.name = name or target.name
        target.status = status or target.status
        target.priority = priority or target.priority
        target.updated_at = datetime.now()
        target.deadline = deadline or target.deadline
        target.memo = memo or target.memo
        target.project = project or target.project
        Task.__session.commit()
        return self

    def delete(self):
        Task.__session.query(UserTable).filter_by(name=id).delete()
