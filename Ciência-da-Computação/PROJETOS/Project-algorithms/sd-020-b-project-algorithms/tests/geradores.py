from functools import lru_cache
from random import choice, randint, shuffle
from typing import List, Tuple

import big_o

Cronograma = Tuple[int, int]


def gerar_cronogramas(quantidade: int) -> Tuple[List[Cronograma], int]:
    """Gera uma lista de cronogramas e um horário dentro de um dos cronogramas

    Um cronograma é uma tupla com o horário inicial e horário final.

    Parameters
    ----------
    quantidade : int
        Quantidade de cronogramas gerados

    Returns
    -------
    Tuple[List[Cronograma], int]
        Uma tupla com uma lista com `quantidade` de cronogramas e um horário
        inicial de qualquer um dos cronogramas (randômico)
    """
    cronogramas = [
        (x, x + randint(0, 3))
        for x in big_o.datagen.integers(quantidade, 1, 5)
    ]
    chosen_time_x = randint(1, 8)
    return cronogramas, chosen_time_x + randint(0, 3)


def gerar_anagramas(tamanho: int) -> Tuple[str, str]:
    """Gera duas palavras de determinado `tamanho` que são anagramas

    Anagramas são palavras onde as letras de uma podem formar a outra.

    Exemplo: ROMA e AMOR são anagramas, pois reorganizando as letras de uma das
    palavras é possível formar a outra.

    Parameters
    ----------
    tamanho : int
        Quantidade de caracteres em cada uma das palavras

    Returns
    -------
    Tuple[str, str]
        Duas palavras que são anagramas
    """
    string1 = big_o.datagen.strings(tamanho)

    # * Este método é utilizado pois o shuffle opera inplace e a cópia de uma
    # * string não gera uma nova string, somente um ponteiro para a mesma ou
    # * seja: se `str1 = copy.copy(str2)` então `id(str1) == id(str2)` é True
    letras_da_string_1 = list(string1)
    shuffle(letras_da_string_1)
    string2 = "".join(letras_da_string_1)

    return string1, string2


def gerar_palíndromos(tamanho: int) -> str:
    """Gera um palíndromo de um determinado `tamanho`

    Um palíndromo é uma palavra que pode ser lida igualmente de trás para
    frente.

    Parameters
    ----------
    tamanho : int
        Tamanho do palíndromo a ser gerado

    Returns
    -------
    str
        Palíndromo
    """
    s = big_o.datagen.strings(tamanho)
    mid = tamanho // 2
    return s[:mid] + s[mid: tamanho - mid] + s[mid - 1:: -1]


@lru_cache
def gerar_inteiros(quantidade_a_gerar: int) -> List[int]:
    """Gera `quantidade_a_gerar` números inteiros randômicos

    Os valores gerados são entre 1 e a `quantidade_a_gerar` * 10, e ao menos
    uma das ocorrências é duplicada.

    A quantidade de números gerados é sempre pelo menos 2

    Parameters
    ----------
    quantidade_a_gerar : int
        Quantidade de números a gerar

    Returns
    -------
    List[int]
        Lista de inteiros randômicos
    """
    if quantidade_a_gerar <= 1:
        quantidade_a_gerar = 2

    resultado = []
    while len(resultado) < quantidade_a_gerar - 1:
        num = randint(1, quantidade_a_gerar * 10)
        if num not in resultado:
            resultado.append(num)

    resultado.append(choice(resultado))  # Adiciona item duplicado
    return resultado
