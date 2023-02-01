import pytest
import big_o
import re
from time import sleep
from challenges.challenge_anagrams import is_anagram

from tests.complexities import (
    NOTAÇÕES,
    DadosDeInferênciaDeComplexidade,
    inferir_complexidade,
    medir_tempos_de_execução,
)
from tests.geradores import gerar_anagramas


class RequirementViolated(Exception):
    pass


def valida_se_nao_foi_usado_sort_padrao():
    with open("challenges/challenge_anagrams.py", "r") as python_file:
        source = python_file.read()
        if "sorted(" in source or ".sort(" in source or "Counter(" in source:
            raise RequirementViolated(
                "Você deve fazer sua própria implementação "
                "do algoritmo de ordenação!"
            )
        has_imports = re.findall(r"^import", source)
        if has_imports:
            raise RequirementViolated(
                "Você não pode importar nada no challenge_anagrams.py!"
            )


@pytest.mark.parametrize(
    "input_first_string, input_second_string",
    [
        pytest.param(
            "pedra",
            "perdaaa",
            marks=pytest.mark.dependency(name="not_anagram_1"),
        ),
        pytest.param(
            "camelo",
            "cameeelo",
            marks=pytest.mark.dependency(name="not_anagram_2"),
        ),
        pytest.param(
            "rio", "ryo", marks=pytest.mark.dependency(name="not_anagram_3")
        ),
        pytest.param(
            "f", "u", marks=pytest.mark.dependency(name="not_anagram_4")
        ),
        pytest.param(
            "aeiouaeiou",
            "aiiouaiiou",
            marks=pytest.mark.dependency(name="not_anagram_5"),
        ),
    ],
)
@pytest.mark.dependency()
def test_validar_se_as_palavras_nao_sao_um_anagrama(
    input_first_string, input_second_string
):
    valida_se_nao_foi_usado_sort_padrao()

    first_string = input_first_string
    second_string = input_second_string
    ordered_first_string = "".join(sorted(first_string))
    ordered_second_string = "".join(sorted(second_string))
    assert is_anagram(first_string, second_string) == (
        ordered_first_string,
        ordered_second_string,
        False,
    )


@pytest.mark.parametrize(
    "input_first_string, input_second_string",
    [
        pytest.param(
            "pedra", "perda", marks=pytest.mark.dependency(name="anagram_1")
        ),
        pytest.param(
            "amor", "roma", marks=pytest.mark.dependency(name="anagram_2")
        ),
        pytest.param(
            "alegria",
            "alergia",
            marks=pytest.mark.dependency(name="anagram_3"),
        ),
        pytest.param(
            "muro", "rumo", marks=pytest.mark.dependency(name="anagram_4")
        ),
        pytest.param("f", "f", marks=pytest.mark.dependency(name="anagram_5")),
    ],
)
@pytest.mark.dependency()
def test_validar_se_as_palavras_sao_um_anagrama(
    input_first_string, input_second_string
):
    valida_se_nao_foi_usado_sort_padrao()

    first_string = input_first_string
    second_string = input_second_string
    ordered_first_string = "".join(sorted(first_string))
    ordered_second_string = "".join(sorted(second_string))
    assert is_anagram(first_string, second_string) == (
        ordered_first_string,
        ordered_second_string,
        True,
    )


@pytest.mark.parametrize(
    "input_first_string, input_second_string",
    [
        pytest.param(
            "", "perda", marks=pytest.mark.dependency(name="empty_1")
        ),
        pytest.param("amor", "", marks=pytest.mark.dependency(name="empty_2")),
        pytest.param(
            "", "alergia", marks=pytest.mark.dependency(name="empty_3")
        ),
        pytest.param("muro", "", marks=pytest.mark.dependency(name="empty_4")),
        pytest.param("", "", marks=pytest.mark.dependency(name="empty_5")),
    ],
)
@pytest.mark.dependency()
def test_valida_palavra_em_branco_retorna_false(
    input_first_string, input_second_string
):
    valida_se_nao_foi_usado_sort_padrao()

    first_string = input_first_string
    second_string = input_second_string
    ordered_first_string = "".join(sorted(first_string))
    ordered_second_string = "".join(sorted(second_string))
    assert is_anagram(first_string, second_string) == (
        ordered_first_string,
        ordered_second_string,
        False,
    )


@pytest.mark.parametrize(
    "input_first_string, input_second_string",
    [
        pytest.param(
            "PEDRA",
            "perda",
            marks=pytest.mark.dependency(name="case_insensitive_1"),
        ),
        pytest.param(
            "amor",
            "RomA",
            marks=pytest.mark.dependency(name="case_insensitive_2"),
        ),
        pytest.param(
            "ALEgria",
            "alergia",
            marks=pytest.mark.dependency(name="case_insensitive_3"),
        ),
        pytest.param(
            "muro",
            "RuMo",
            marks=pytest.mark.dependency(name="case_insensitive_4"),
        ),
        pytest.param(
            "f", "F", marks=pytest.mark.dependency(name="case_insensitive_5")
        ),
    ],
)
def test_validar_se_as_palavras_sao_um_anagrama_case_insensitive(
    input_first_string, input_second_string
):
    valida_se_nao_foi_usado_sort_padrao()

    first_string = input_first_string
    second_string = input_second_string
    ordered_first_string = "".join(sorted(first_string.lower()))
    ordered_second_string = "".join(sorted(second_string.lower()))
    assert is_anagram(first_string, second_string) == (
        ordered_first_string,
        ordered_second_string,
        True,
    )


@pytest.mark.dependency(
    depends=[
        "not_anagram_1",
        "not_anagram_2",
        "not_anagram_3",
        "not_anagram_4",
        "not_anagram_5",
    ]
)
@pytest.mark.dependency(
    depends=["anagram_1", "anagram_2", "anagram_3", "anagram_4", "anagram_5"]
)
@pytest.mark.dependency(
    depends=["empty_1", "empty_2", "empty_3", "empty_4", "empty_5"]
)
@pytest.mark.dependency(
    depends=[
        "case_insensitive_1",
        "case_insensitive_2",
        "case_insensitive_3",
        "case_insensitive_4",
        "case_insensitive_5",
    ]
)
def test_validar_tempo_anagrama():
    maior_complexidade_aceitável = big_o.complexities.Linearithmic

    # ! Tenta fazer o teste passar 3 vezes antes de confirmar que deu ruim
    for _ in range(3):
        dados = DadosDeInferênciaDeComplexidade(
            função_analisada=lambda tupla_de_str: is_anagram(*tupla_de_str),
            função_de_geração=gerar_anagramas,
            # * Valores obtidos de forma empírica, por meio de testes robustos
            ordens_de_grandeza=6,
            ordem_inicial=3,
            base_de_grandeza=2,
            quantidade_de_execuções=243,
            vezes_a_repetir=9,
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
