from linked_list import LinkedList


class Stack_2:
    def __init__(self):
        self.__data = LinkedList()

        def push(self, value):
            self.__data.insert_last(value)

        def pop(self):
            return self.__data.remove_last()

        def peek(self):
            return self.__data.get_element_at(len(self.__data) - 1)

        def is_empty(self):
            return not len(self.__data)
