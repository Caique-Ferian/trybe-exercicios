from time import sleep

import big_o
from challenges.challenge_find_the_duplicate import find_duplicate

from tests.complexities import (
    NOTAÇÕES,
    DadosDeInferênciaDeComplexidade,
    inferir_complexidade,
    medir_tempos_de_execução,
)
from tests.geradores import gerar_inteiros


def test_validar_se_encontra_numeros_repetidos():
    nums = [1, 3, 4, 2, 2]
    assert find_duplicate(nums) == 2
    nums = [3, 1, 3, 4, 2]
    assert find_duplicate(nums) == 3
    nums = [1, 1]
    assert find_duplicate(nums) == 1
    nums = [1, 1, 2]
    assert find_duplicate(nums) == 1
    nums = [3, 1, 2, 4, 6, 5, 7, 7, 7, 8]
    assert find_duplicate(nums) == 7


def test_validar_se_retorna_false_quando_nao_envia_valores():
    nums = []
    assert find_duplicate(nums) is False


def test_validar_se_retorna_false_quando_envia_string():
    nums = ["a", "b"]
    assert find_duplicate(nums) is False


def test_validar_se_retorna_false_quando_nao_ha_repeticao():
    nums = [1, 2]
    assert find_duplicate(nums) is False


def test_validar_se_retorna_false_quando_passa_um_valor_apenas():
    nums = [1]
    assert find_duplicate(nums) is False


def test_validar_se_retorna_false_quando_passa_numero_negativo():
    nums = [-1, -1]
    assert find_duplicate(nums) is False


def test_validar_tempo_duplicate():
    assert (
        _algoritmo_está_correto()
    ), "O algoritmo precisa estar correto para passar na validação de tempo"

    maior_complexidade_aceitável = big_o.complexities.Linearithmic

    # ! Tenta fazer o teste passar algumas vezes antes de confirmar que deu
    # ! ruim, bem como aumenta a quantidade de entradas a cada vez que falha
    for tries in range(5):
        dados = DadosDeInferênciaDeComplexidade(
            função_analisada=find_duplicate,
            função_de_geração=gerar_inteiros,
            # * Valores obtidos de forma empírica, por meio de testes robustos
            ordens_de_grandeza=5 + tries // 2,
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


def _algoritmo_está_correto() -> bool:
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
        test_validar_se_encontra_numeros_repetidos()
        test_validar_se_retorna_false_quando_nao_envia_valores()
        test_validar_se_retorna_false_quando_envia_string()
        test_validar_se_retorna_false_quando_nao_ha_repeticao()
        test_validar_se_retorna_false_quando_passa_um_valor_apenas()
        test_validar_se_retorna_false_quando_passa_numero_negativo()
    except AssertionError:
        return False
    return True
