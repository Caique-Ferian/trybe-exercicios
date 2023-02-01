from src.pre_built.counter import count_ocurrences


def test_counter():
    result = count_ocurrences("tests/mocks/jobs.csv", "developer")
    assert type(result) == int
    assert result == 3

    result = count_ocurrences("tests/mocks/jobs.csv", "TIME")
    assert type(result) == int
    assert result == 2
