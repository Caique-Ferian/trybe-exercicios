import pytest
from ting_file_management.priority_queue import PriorityQueue


def test_basic_priority_queueing():
    """Testa métodos enqueue, dequeue e search da classe PriorityQueue"""
    priority_queue = PriorityQueue()
    priority_queue.enqueue({"qtd_linhas": 10})
    priority_queue.enqueue({"qtd_linhas": 2})
    assert len(priority_queue) == 2
    assert priority_queue.search(0)["qtd_linhas"] == 2
    assert priority_queue.search(1)["qtd_linhas"] == 10
    priority_queue.dequeue()
    assert priority_queue.search(0)["qtd_linhas"] == 10
    with pytest.raises(IndexError):
        priority_queue.search(1)
