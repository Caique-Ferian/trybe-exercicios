from ting_file_management.priority_queue import PriorityQueue


class _TestEnqueueDoesNothing(PriorityQueue):
    """Testar uso relevante do método 'enqueue'"""

    def enqueue(self, value):
        pass


class _TestDequeueDoesNothing(PriorityQueue):
    """Testar uso relevante do método 'dequeue'"""

    def dequeue(self):
        pass


class _TestInvertedPriority(PriorityQueue):
    """Testar regra de prioridade invertida"""

    def is_priority(self, value):
        return not super().is_priority(value)


class _TestNoPriority(PriorityQueue):
    """Testar regra de prioridade inexistente (sempre True)"""

    def is_priority(self, value):
        return True


class _TestInvertedSearch(PriorityQueue):
    """Testar busca com comportamento invertido"""

    def search(self, index):
        if index < len(self.regular_priority):
            return self.regular_priority.search(index)
        return self.high_priority.search(index)


class _TestSearchShouldRaiseIndexError(PriorityQueue):
    """Testar lançamento de erro com índice inválido na busca"""

    def search(self, index):
        if index not in range(len(self)):
            return None

        return super().search(index)
