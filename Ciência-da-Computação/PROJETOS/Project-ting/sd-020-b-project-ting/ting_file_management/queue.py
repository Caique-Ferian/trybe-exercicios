from ting_file_management.abstract_queue import AbstractQueue


class Queue(AbstractQueue):
    def __init__(self):
        self.__queue = list()

    def __len__(self):
        return len(self.__queue)

    def __get__(self):
        return self.__queue

    def enqueue(self, value):
        self.__queue.append(value)

    def dequeue(self):
        return self.__queue.pop(0)

    def search(self, index):
        if index not in range(self.__len__()):
            raise IndexError
        else:
            return self.__queue[index]
