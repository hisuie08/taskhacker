from .database import *


class User:
    """
    ユーザークラス。登録、認証、退会等ユーザー管理を統括する
    """

    def __init__(self):
        self._session: sessionmaker = DBInterface().session
        self.id = None
        self.name = None
        self.passwd = None
        # TODO マルチユーザーを想定しているため後々権限プロパティも生やす
        # TODO パスワード平文を何とかする

    def register(self, name, passwd):
        self._session.add(
            UserTable(id=createUUID(), name=name, passwd=passwd))
        self._session.commit()
        return self.auth(name, passwd)

    def auth(self, name, passwd):
        user = self._session.query(UserTable).filter_by(
            name=name).first()
        if user is None:
            return 1
        if user.passwd != passwd:
            return 2
        self.id, self.name, self.passwd = user.id, user.name, user.passwd
        return self

    def edit(name=None, passwd=None):
        target = self._session.query(UserTable).filter_by(id=self.id).first()
        target.name = name or target.name
        target.passwd = passwd or target.passwd
        self._session.commit()
        return self.auth(name, passwd)

    def unregister(self) -> None:
        self._session.query(UserTable).filter_by(name=self.id).delete()
