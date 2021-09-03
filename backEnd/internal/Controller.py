from .Project import Project
from .Task import Task
from .User import User
from .utils import *
from .database import *


class Controller(Singleton):
    """
    APIからのリクエストを元にDBを参照しながら処理を行う中央集権クラス
    """

    def __init__(self):
        self.__session = DBInterface.session
        self.userController = User
        self.projectController = Project
        self.taskController = Task
