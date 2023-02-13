class Conjunto:
    def __init__(self):
        self.set = [False for _ in range(1001)]

    def add(self, item):
        self.set[item] = True

    def __str__(self):
        string_set = "{"
        for index in range(len(self.set)):
            if self.set[index] is True:
                string_set += str(index)
                if index < len(self.set) - 1:
                    string_set += ", "
        string_set += "}"
        return string_set

    def __contains__(self, item):
        return self.set[item]

    def union(self, set_b):
        new_set = Conjunto()
        for index in range(1001):
            if self.set[index] or set_b.set[index]:
                new_set.add(index)
        return new_set

    def intersection(self, set_b):
        new_set = Conjunto()
        for index in range(1001):
            if self.set[index] and set_b.set[index]:
                new_set.add(index)
        return new_set

    def difference(self, set_b):
        new_set = Conjunto()
        for index in range(1001):
            if self.set[index] and not set_b.set[index]:
                new_set.add(index)
        return new_set

    def issubset(self, set_b):

        for index in range(1001):
            if self.set[index] and not set_b.set[index]:
                return False
        return True

    def issuperset(self, set_b):

        for index in range(1001):
            if set_b.set[index] and not self.set[index]:
                return False
        return True


if __name__ == "__main__":
    set_1 = Conjunto()
    set_2 = Conjunto()
    for i in range(1, 11):
        set_1.add(i)

    for i in range(10, 21):
        set_2.add(i)
    print("Union set:", set_1.union(set_2))
    print("Intersection set:", set_1.intersection(set_2))
