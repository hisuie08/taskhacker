from .database import *
from .Task import Task
from .utils import *


class Project:
    """
    Projectクラスは配下に持つTaskを格納するslaveプロパティを持ち
    Taskのグルーピングを主な目的とする。
    Taskも自身のプロパティに親となるProjectのidを持ち、相互に連携する
    """

    @staticmethod
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
        with Project.__session().begin() as session:
            projectId = createUUID()
            session.add(ProjectTable(
                id=projectId, name=name, owner=owner, description=description))
            session.commit()
        return Project(projectId, name, owner, description).fetchSlaves()

    def fetchSlaves(self):
        with Task.__session().begin() as session:
            self.slaves = session.query(
                TaskTable).filter_by(project=self.id).all()
        return self

    def delete(self):
        with Project.__session().begin() as session:
            session.query(
                TaskTable).filter_by(project=self.id).delete()
            session.query(ProjectTable).filter_by(id=self.id).delete()

    def createTask(self, name, status, priority, deadline, memo):
        if self.id is None:
            return
        now = datetime.now()
        newTask = Task.create(name=name, deadline=deadline, priority=priority,
                              memo=memo, status=status)
        self.slaves.append(newTask)
        return self
