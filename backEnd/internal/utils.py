from datetime import datetime
from random import randint


def createUUID():
    return int(str(int(datetime.timestamp(datetime.now())))+str(randint(0, 999)))


class Singleton(object):
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, "_instance"):
            cls._instance = super(Singleton, cls).__new__(cls)
        return cls._instance
