from .database import *


class User:
    """
    ユーザークラス。登録、認証、退会等ユーザー管理を統括する
    """

    def __init__(self, interface):
        self.__session: sessionmaker = interface.session
        self.id = None
        self.name = None
        self.passwd = None
        # TODO マルチユーザーを想定しているため後々権限プロパティも生やす
        # TODO パスワード平文を何とかする

    def register(self, name, passwd):
        self.__session.add(
            UserTable(id=createUUID(), name=name, passwd=passwd))
        self.__session.commit()
        return self.auth(name, passwd)

    def auth(self, name, passwd):
        user = self.__session.query(UserTable).filter_by(
            name=name).first()
        if user is None:
            return 1
        if user.passwd != passwd:
            return 2
        self.id, self.name, self.passwd = user.id, user.name, user.passwd
        return self

    def changePassword(self, oldPasswd, newPasswd):
        # TODO Not implemented
        return

    def unregister(self, id) -> None:
        self.__session.query(UserTable).filter_by(name=id).delete()
        self.__session.commit()
