from src.pre_built.brazilian_jobs import read_brazilian_file


def test_brazilian_jobs():
    expected = [
        {"title": "Maquinista", "salary": "2000", "type": "trainee"},
        {"title": "Motorista", "salary": "3000", "type": "full time"},
    ]
    result = read_brazilian_file("tests/mocks/brazilians_jobs.csv")
    assert result[0] == expected[0]
    assert result[1] == expected[1]
