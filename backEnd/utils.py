from datetime import datetime
from math import randint


def createUUID():
    return int(str(int(datetime.timestamp(datetime.now())))+str(randint(0, 999)))
