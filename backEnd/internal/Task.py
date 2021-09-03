from .database import *
from .enumValue import *
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

    def __init__(self):
        self._session: sessionmaker = DBInterface().session
        self.id = None
        self.name = None
        self.status = None
        self.priority = None
        self.created_at = None
        self.updated_at = None
        self.deadline = None
        self.memo = None
        self.project = None

    def create(self, name, deadline, memo, project, status=Status.WAITING, priority=Priority.LOW):
        self._session.add(
            TaskTable(id=createUUID(), name=name, status=status.value,
                      priority=priority.value, deadline=deadline, memo=memo, project=project))
        self._session.commit()
        return

    def update(self, name=None, status=None, priority=None, deadline=None, memo=None, project=None):
        target = self._session.query(TaskTable).filter_by(id=self.id)
        target.name = name or target.name
        target.status = status or target.status
        target.priority = priority or target.priority
        target.updated_at = datetime.now()
        target.deadline = deadline or target.deadline
        target.memo = memo or target.memo
        target.project = project or target.project
        self.session.commit()

    def delete(self):
        self._session.query(UserTable).filter_by(name=id).delete()


pass
