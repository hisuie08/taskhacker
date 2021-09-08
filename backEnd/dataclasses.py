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

    @staticmethod
    def register(self, session, name, owner, description=None):
        with self.session.begin() as session:
            projectId = createUUID()
            self.session.add(ProjectTable(
                id=projectId, name=name, owner=owner, description=description))
            self.session.commit()
        return Project(projectId, name, owner, description).fetchSlaves()

    def fetchSlaves(self, session):
        with self.session.begin() as session:
            self.slaves = self.session.query(
                TaskTable).filter_by(project=self.id).all()
        return self

    def delete(self, session):
        with self.session.begin() as session:
            self.session.query(
                TaskTable).filter_by(project=self.id).delete()
            self.session.query(ProjectTable).filter_by(id=self.id).delete()

    def createTask(self, name, status, priority, deadline, memo):
        if self.id is None:
            return
        now = datetime.now()
        newTask = Task.create(name=name, deadline=deadline, priority=priority,
                              memo=memo, status=status)
        self.slaves.append(newTask)
        return self


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

    def create(self, name, deadline, memo, project, status=0, priority=0):
        uuid = createUUID()
        with self.session.begin() as session:
            self.session.add(
                TaskTable(
                    id=uuid, name=name, status=status.value, priority=priority.value,
                    deadline=deadline, memo=memo, project=project))
        return Task.fetch(uuid)

    def fetch(self, id):
        with self.session.begin() as session:
            return self.session.query(TaskTable).filter(id=id).first()

    def update(self, name=None, status=None, priority=None, deadline=None, memo=None, project=None):
        with self.session.begin() as session:
            target = Task.__self.session.query(TaskTable).filter_by(id=self.id)
            target.name = name or target.name
            target.status = status or target.status
            target.priority = priority or target.priority
            target.updated_at = datetime.now()
            target.deadline = deadline or target.deadline
            target.memo = memo or target.memo
            target.project = project or target.project
        return self.fetch(target.id)

    def delete(self):
        with self.session.begin() as session:
            self.session.query(UserTable).filter_by(name=id).delete()


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

    def register(self, name, passwd):
        with self.session.begin() as session:
            self.session.add(
                UserTable(id=createUUID(), name=name, passwd=passwd))
        return User.auth(name, passwd)

    def auth(self, name, passwd):
        with self.session.begin() as session:
            user = self.session.query(UserTable).filter_by(
                name=name).first()
            if user is None:
                raise Exception("User not found")
            if user.passwd != passwd:
                raise Exception("Passwords do not match")
            return User(user.id, user.name, user.passwd)

    def unregister(self) -> None:
        with self.session.begin() as session:
            self.session.query(UserTable).filter_by(name=self.id).delete()
