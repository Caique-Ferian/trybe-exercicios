class MainMemory:
    def __init__(self):
        self.clean()

    def load(self, value):
        self.loaded_memory.append(value)

    def get(self, index):
        if index > len(self.loaded_memory) or type(index) != int:
            return 0

        return int(self.loaded_memory[index])

    def clean(self):
        self.loaded_memory = []
