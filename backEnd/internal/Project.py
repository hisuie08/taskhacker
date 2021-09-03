from .database import *


class Project:
    """
    Projectクラスは配下に持つTaskを格納するslaveプロパティを持ち
    Taskのグルーピングを主な目的とする。
    Taskも自身のプロパティに親となるProjectのidを持ち、相互に連携する
    """

    @classmethod
    def _session():
        return DBInterface().session

    def __init__(self, id=None, name=None, owner=None, description=None, slave=[]):
        self.id = id
        self.name = name
        self.owner = owner
        self.description = description
        self.slave = slave

    @staticmethod
    def register(self, name, owner, description=None):
        Project._session.add(ProjectTable(
            id=createUUID, name=name, owner=owner, description=description))
        Project._session.commit()

    def getSlaves(self):
        return Project._session.query(
            TaskTable).filter_by(project=self.id).all()

    def delete(self):
        Project._session.query(
            TaskTable).filter_by(project=self.id).delete()
        Project._session.query(ProjectTable).filter_by(id=self.id).delete()
