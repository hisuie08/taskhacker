from .database import *


class User:
    """
    ユーザークラス。登録、認証、退会等ユーザー管理を統括する
    """
    @staticmethod
    def __session():
        return DBInterface().session

    def __init__(self, id=None, name=None, passwd=None):
        self.id = id
        self.name = name
        self.passwd = passwd
        # TODO マルチユーザーを想定しているため後々権限プロパティも生やす
        # TODO パスワード平文を何とかする

    @staticmethod
    def register(self, name, passwd):
        with User.__session().begin() as session:
            session.add(
                UserTable(id=createUUID(), name=name, passwd=passwd))
        return User.auth(name, passwd)

    @staticmethod
    def auth(self, name, passwd):
        with User.__session().begin() as session:
            user = User.__session.query(UserTable).filter_by(
                name=name).first()
            if user is None:
                return 1
            if user.passwd != passwd:
                return 2
            return User(user.id, user.name, user.passwd)

    def unregister(self) -> None:
        User.__session.query(UserTable).filter_by(name=self.id).delete()
