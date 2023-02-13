from src.analyze_log import analyze_log
import pytest
import re


def test_validate_content_of_generated_file():
    analyze_log("data/orders_1.csv")
    FILE_TXT = "data/mkt_campaign.txt"
    with open(FILE_TXT) as f:
        file_txt_file = f.readlines()
        (
            maria_eats,
            arnaldo_ask_hamburguer,
            joao_never_ask,
            joao_never_went,
        ) = file_txt_file
    assert maria_eats == "hamburguer\n"
    assert arnaldo_ask_hamburguer == "1\n"
    assert eval(joao_never_ask) == {"pizza", "coxinha", "misto-quente"}
    assert eval(joao_never_went) == {"sabado", "segunda-feira"}


def test_validate_nonexistent_file():
    expect_text = re.compile(
        r"Arquivo\s+inexistente.+data/orders_3.csv", flags=re.IGNORECASE
    )
    with pytest.raises(FileNotFoundError, match=expect_text):
        assert analyze_log("data/orders_3.csv")


def test_validate_file_with_invalid_extension():
    expect_text = re.compile(
        r"Extens[aã]o\s+inv[áa]lida.+data/orders_1.txt", flags=re.IGNORECASE
    )
    with pytest.raises(FileNotFoundError, match=expect_text):
        assert analyze_log("data/orders_1.txt")
