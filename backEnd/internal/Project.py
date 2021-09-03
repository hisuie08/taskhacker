from .database import *
from .Task import Task
from .utils import *


class Project:
    """
    Projectクラスは配下に持つTaskを格納するslaveプロパティを持ち
    Taskのグルーピングを主な目的とする。
    Taskも自身のプロパティに親となるProjectのidを持ち、相互に連携する
    """

    @classmethod
    def __session():
        return DBInterface().session

    def __init__(self, id=None, name=None, owner=None, description=None, slaves=[]):
        self.id = id
        self.name = name
        self.owner = owner
        self.description = description
        self.slaves = slaves

    @staticmethod
    def register(self, name, owner, description=None):
        projectId = createUUID()
        Project.__session.add(ProjectTable(
            id=projectId, name=name, owner=owner, description=description))
        Project.__session.commit()
        return Project(projectId, name, owner, description).fetchSlaves()

    def fetchSlaves(self):
        self.slaves = Project.__session.query(
            TaskTable).filter_by(project=self.id).all()
        return self

    def delete(self):
        Project.__session.query(
            TaskTable).filter_by(project=self.id).delete()
        Project.__session.query(ProjectTable).filter_by(id=self.id).delete()

    def createTask(self, name, status, priority, deadline, memo):
        if self.id is None:
            return
        now = datetime.now()
        task = Task(createUUID(), name, status, priority,
                    now, now, deadline, memo, self.id)
        task.create()
