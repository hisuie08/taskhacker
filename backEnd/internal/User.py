from .database import *


class User:
    """
    ユーザークラス。登録、認証、退会等ユーザー管理を統括する
    """
    @classmethod
    def _session():
        return DBInterface().session

    def __init__(self, id=None, name=None, passwd=None):
        self.id = id
        self.name = name
        self.passwd = passwd
        # TODO マルチユーザーを想定しているため後々権限プロパティも生やす
        # TODO パスワード平文を何とかする

    @staticmethod
    def register(self, name, passwd):
        User._session.add(
            UserTable(id=createUUID(), name=name, passwd=passwd))
        User._session.commit()
        return self.auth(name, passwd)

    @staticmethod
    def auth(self, name, passwd):
        user = User._session.query(UserTable).filter_by(
            name=name).first()
        if user is None:
            return 1
        if user.passwd != passwd:
            return 2
        self.id, self.name, self.passwd = user.id, user.name, user.passwd
        return self

    def edit(name=None, passwd=None):
        target = User._session.query(UserTable).filter_by(id=self.id).first()
        target.name = name or target.name
        target.passwd = passwd or target.passwd
        User._session.commit()
        return self.auth(name, passwd)

    def unregister(self) -> None:
        User._session.query(UserTable).filter_by(name=self.id).delete()
