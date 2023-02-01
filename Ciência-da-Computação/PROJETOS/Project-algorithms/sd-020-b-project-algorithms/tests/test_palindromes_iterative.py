from time import sleep

import big_o
from challenges.challenge_palindromes_iterative import is_palindrome_iterative

from tests.complexities import (
    NOTAÇÕES,
    DadosDeInferênciaDeComplexidade,
    inferir_complexidade,
    medir_tempos_de_execução,
)
from tests.geradores import gerar_palíndromos


def test_validar_se_a_palavra_e_um_palindromo_iterativo_retorna_true():
    word = "I"
    assert is_palindrome_iterative(word) is True
    word = "GG"
    assert is_palindrome_iterative(word) is True
    word = "ANA"
    assert is_palindrome_iterative(word) is True
    word = "ESSE"
    assert is_palindrome_iterative(word) is True
    word = "SOCOS"
    assert is_palindrome_iterative(word) is True
    word = "REVIVER"
    assert is_palindrome_iterative(word) is True


def test_validar_se_a_palavra_nao_e_um_palindromo_iterativo_retorna_false():
    word = "AGUA"
    assert is_palindrome_iterative(word) is False


def test_validar_se_nao_passar_palavra_iterativa_retorna_false():
    word = ""
    assert is_palindrome_iterative(word) is False


def test_validar_tempo_iterative():
    assert (
        _algoritmo_está_correto()
    ), "O algoritmo precisa estar correto para passar na validação de tempo"

    maior_complexidade_aceitável = big_o.complexities.Linear

    # ! Tenta fazer o teste passar 3 vezes antes de confirmar que deu ruim
    for _ in range(3):
        dados = DadosDeInferênciaDeComplexidade(
            função_analisada=is_palindrome_iterative,
            função_de_geração=gerar_palíndromos,
            # * Valores obtidos de forma empírica, por meio de testes robustos
            ordens_de_grandeza=6,
            ordem_inicial=3,
            base_de_grandeza=3,
            quantidade_de_execuções=6561,
            vezes_a_repetir=3,
        )

        resultados = medir_tempos_de_execução(dados)
        complexidade_observada = inferir_complexidade(
            resultados.tamanhos, resultados.tempos
        )

        if complexidade_observada <= maior_complexidade_aceitável:
            break
        sleep(3)
    else:
        assert False, (
            "Seu algoritmo parece ser "
            f"{NOTAÇÕES[complexidade_observada.__class__]}, mas"  # type:ignore
            f" deveria ser no máximo {NOTAÇÕES[maior_complexidade_aceitável]}"
        )


def _algoritmo_está_correto():
    """Valida se o algoritmo está correto

    Roda as funções de teste que garantem que o algoritmo da função está
    correto

    Serve como uma função auxiliar para o cálculo de tempo, que necessita
    validar que o algoritmo está correto antes de validar o tempo de execução

    Returns
    -------
    bool
        True se todas as funções de teste passarem, False caso contrário
    """
    try:
        test_validar_se_a_palavra_e_um_palindromo_iterativo_retorna_true()
        test_validar_se_a_palavra_nao_e_um_palindromo_iterativo_retorna_false()
        test_validar_se_nao_passar_palavra_iterativa_retorna_false()
    except AssertionError:
        return False
    return True
