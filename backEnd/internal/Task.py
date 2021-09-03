from .database import *


class Task:
    """
    Taskは最も重要な概念クラス。
    Project配下に属し、作成日、進行状況等を保持・更新する。
    """

    def __init__(self, interface):
        self.__session = interface.session
    # TODO Not implemented
