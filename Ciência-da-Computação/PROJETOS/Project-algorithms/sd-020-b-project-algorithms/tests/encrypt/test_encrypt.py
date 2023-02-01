from challenges.challenge_encrypt_message import encrypt_message
import pytest


def test_encrypt_message():

    "Se key for um valor não inteiro, levanta um TypeError"
    with pytest.raises(TypeError, match="tipo inválido para key"):
        encrypt_message("teste", "10")

    "Se message for um valor não string, levanta um TypeError"
    with pytest.raises(TypeError, match="tipo inválido para message"):
        encrypt_message(9, 10)

    "Se key for maior que o tamanho da palavra, apenas inverte a message"
    expect_1 = "etset"
    assert encrypt_message("teste", 10) == expect_1

    """divide message no índice key, inverte a posição das partes, inverte os
    caracteres de cada parte, e retorna a união das partes novamente com "_"
    entre elas"""
    expect_2 = "odna_tset"
    assert encrypt_message("testando", 4) == expect_2
