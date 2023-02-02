from exercise_3 import Stack


class StackOverflowException(Exception):
    pass


class LimitedStack(Stack):
    def __init__(self, limit):
        super().__init__()
        self.limit = limit

    def push(self, value):
        try:
            if self.size() == self.limit:
                raise StackOverflowException
            super().push(value)
        except StackOverflowException:
            print("The Stack is Full")


stack = LimitedStack(2)
stack.push(1)
stack.push(-2)
stack.push(3)
