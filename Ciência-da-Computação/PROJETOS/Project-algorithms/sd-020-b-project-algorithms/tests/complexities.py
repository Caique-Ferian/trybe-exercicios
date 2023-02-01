import json
from dataclasses import dataclass, field
from itertools import zip_longest
from statistics import mean, median, stdev
from timeit import repeat
from typing import Any, Callable, List, Optional, Union

import big_o
import matplotlib.pyplot as plt
import numpy as np

Tempos = List[Union[float, int]]
Tamanhos = List[int]

NOTAÇÕES = {
    big_o.complexities.Constant: "O(1)",
    big_o.complexities.Logarithmic: "O(log n)",
    big_o.complexities.Linear: "O(n)",
    big_o.complexities.Linearithmic: "O(n log n)",
    big_o.complexities.Quadratic: "O(n^2)",
    big_o.complexities.Cubic: "O(n^3)",
    big_o.complexities.Polynomial: "O(n^x)",
    big_o.complexities.Exponential: "O(2^n)",
}


@dataclass
class DadosDeInferênciaDeComplexidade:
    """
    Parameters
    ----------
    função_analisada : Callable
        Função cuja complexidade será inferida
    função_de_geração : Callable[[int], List[Any]]
        Função que irá gerar entradas para a função analisada

        Ela deverá receber um inteiro, contendo o número de elementos a serem
        gerados para servir como entradas da função analisada

        O retorno dessa função deve ser, preferencialmente, uma lista de
        valores que levem o algoritmo da função analisada ao pior caso de
        complexidade de tempo
    ordens_de_grandeza : int, opcional
        Quantidade de ordens de grandeza das entradas geradas, começando de
        `ordem_inicial`, por padrão 4
    ordem_inicial : int, opcional
        Primeira ordem de grandeza à qual a `base_de_grandeza` será elevada.
        Sugere-se que esse valor não seja muito pequeno, visto que para
        tamanhos de entrada pequenos os tempos mensurados para a execução de
        algoritmos são imprecisos do ponto de vista de análise assintótica,
        por padrão 3
    base_de_grandeza : int, opcional
        Base da geração das ordens de grandeza das entradas: o número que é
        elevado a `ordens_de_grandeza` para definir a quantidade de elementos
        a serem gerados, por padrão 10
    quantidade_de_execuções : int, opcional
        Quantidade de vezes que a função analisada deve ser executada com a
        mesma entrada para medir o tempo total de todas as execuções

        Se a função for muito rápida, convém executar ela algumas milhares de
        vezes para a medição do tempo total de execução dessas milhares de
        vezes, de forma a ter um valor próximo de 1 segundo inteiro ou mais,
        visto que valores muito pequenos de tempo podem ser imprecisos

        Por padrão 10000
    vezes_a_repetir : int, opcional
        Quantidade de vezes a repetir a temporização, de forma a garantir
        picos de uso de CPU não irão atrapalhar a medição

        Por padrão 10
    """

    função_analisada: Callable
    função_de_geração: Callable[[int], Any]
    ordens_de_grandeza: int = 4
    base_de_grandeza: int = 10
    quantidade_de_execuções: int = 10_000
    vezes_a_repetir: int = 10
    ordem_inicial: int = 3


@dataclass
class ResultadosDeMedição:
    tamanhos: Tamanhos
    tempos: Tempos
    médias: List[float] = field(default_factory=lambda: [])
    desvios: List[float] = field(default_factory=lambda: [])


def medir_tempos_de_execução(
    dados: DadosDeInferênciaDeComplexidade,
) -> ResultadosDeMedição:
    """Mede os tempos de execução de uma função

    O objetivo da função é inferir a melhor complexidade alcançada, visto que
    instabilidades no ambiente podem gerar complexidades maiores erroneamente

    `ordens_de_grandeza` e `base_de_grandeza` ditam o tamanho das entradas que
    a `função_analisada` vai receber, enquanto que `quantidade_de_execuções`,
    `ordens_de_grandeza` e `vezes_a_repetir` indicam quantas vezes a função
    será executada.

    Exemplo:
    Se a função for chamada com uma `função_analisada` que recebe uma lista de
    inteiros como parâmetro, uma `função_de_geração` que gera inteiros e recebe
    como parâmetro a quantidade de inteiros que irá gerar, `ordem_inicial` = 0
    `ordens_de_grandeza` = 5, `base_de_grandeza` = 2, `quantidade_de_execuções`
    = 100 e `vezes_a_repetir` = 3, a `função_de_geração` será chamada com os
    valores 2^0, 2^1, 2^2, 2^3 e 2^4 (a base 2, totalizando 5 ordens). Em cada
    uma dessas vezes, o resultado será passado para a `função_analisada`, que
    será chamada 300 vezes, sendo 3 vezes de 100, onde o tempo de execução dela
    por 100 vezes com a determinada entrada será mensurado, totalizando 3
    mensurações de tempo (ou seja, vai ser checado 3 vezes quanto tempo leva
    para executar a função 100 vezes com aquela entrada).

    Parameters
    ----------
    dados: DadosDeInferênciaDeComplexidade

    Returns
    -------
    tamanho_das_entradas, tempos_medidos: Tuple[Tamanhos, Tempos]
    """
    medianas = []
    médias = []
    desvios_padrão = []
    tamanhos_das_entradas = [
        dados.base_de_grandeza**ordem
        for ordem in range(
            dados.ordem_inicial, dados.ordens_de_grandeza + dados.ordem_inicial
        )
    ]

    for tamanho_da_entrada in tamanhos_das_entradas:
        entradas = dados.função_de_geração(tamanho_da_entrada)

        resultado_do_timer = repeat(
            lambda: dados.função_analisada(entradas),
            number=dados.quantidade_de_execuções,
            repeat=dados.vezes_a_repetir,
        )

        medianas.append(median(resultado_do_timer))
        médias.append(mean(resultado_do_timer))
        desvios_padrão.append(stdev(resultado_do_timer))

    return ResultadosDeMedição(
        tamanhos=tamanhos_das_entradas,
        tempos=medianas,
        médias=médias,
        desvios=desvios_padrão,
    )


def inferir_complexidade(
    tamanhos_das_entradas: Tamanhos, tempos_medidos: Tempos
) -> big_o.complexities.ComplexityClass:
    """Infere a complexidade assintótica de tempo de uma função

    Parameters
    ----------
    dados: DadosDeInferênciaDeComplexidade

    Returns
    -------
    big_o.complexities.ComplexityClass
        Provável complexidade temporal da função, na forma de subclasse da
        ComplexityClass da biblioteca big_o
    """
    provável_complexidade, _ = big_o.infer_big_o_class(
        # ! A big_o exige que `ns` seja um array numpy para as transformadas
        ns=np.array(tamanhos_das_entradas),
        time=tempos_medidos,
    )

    if provável_complexidade is None or not isinstance(
        provável_complexidade, big_o.complexities.ComplexityClass
    ):
        raise ValueError(
            "Complexidade inferida não é subclasse das complexidades da lib"
            " big_o"
        )

    return provável_complexidade


def salvar_dados(
    dados: DadosDeInferênciaDeComplexidade,
    resultados: ResultadosDeMedição,
    provável_complexidade: big_o.complexities.ComplexityClass,
    id_: int = 1,
) -> str:
    data = {
        "funcao_analisada": dados.função_analisada.__name__,
        "funcao_de_geracao": dados.função_de_geração.__name__,
        "ordens_de_grandeza": dados.ordens_de_grandeza,
        "base_de_grandeza": dados.base_de_grandeza,
        "quantidade_de_execucoes": dados.quantidade_de_execuções,
        "vezes_a_repetir": dados.vezes_a_repetir,
        "pontos_medidos": [
            (tamanho, tempo, média, desvio)
            for tamanho, tempo, média, desvio in zip_longest(
                resultados.tamanhos,
                resultados.tempos,
                resultados.médias,
                resultados.desvios,
            )
        ],
        "provavel_complexidade": f"{provável_complexidade}",
    }

    caminho_completo = _gerar_caminho_do_arquivo(dados.função_analisada, id_)

    with open(f"{caminho_completo}.json", "w", encoding="utf-8") as arquivo:
        arquivo.write(json.dumps(data))

    return f"{id_}".zfill(3)


def gerar_gráfico(
    dados: DadosDeInferênciaDeComplexidade,
    resultados: ResultadosDeMedição,
    provável_complexidade: Optional[big_o.complexities.ComplexityClass] = None,
    id_: int = 1,
):
    caminho_completo = _gerar_caminho_do_arquivo(dados.função_analisada, id_)
    plt.plot(resultados.tamanhos, resultados.tempos, "bo-")
    plt.plot(resultados.tamanhos, resultados.médias, "ro:")
    # plt.plot(resultados.tamanhos, resultados.desvios, "ro.")
    plt.xlabel(
        f"Tamanho das entradas: de "
        f"{dados.base_de_grandeza}^{dados.ordem_inicial} a "
        f"{dados.base_de_grandeza}"
        f"^{dados.ordem_inicial + dados.ordens_de_grandeza}"
    )
    plt.ylabel(
        f"Tempo medido: {dados.vezes_a_repetir} vezes de "
        f"{dados.quantidade_de_execuções} execuções"
    )
    plt.title(
        f"{dados.função_analisada.__name__}\n"
        f"{provável_complexidade or 'Complexidade não medida'}"
    )
    plt.savefig(f"{caminho_completo}.png")
    plt.close()


def _gerar_caminho_do_arquivo(função_analisada: Callable, id_: int):
    caminho = "tests/resultados"
    # nome_do_arquivo = f"{int(time.time())}.{função_analisada.__name__}"
    nome_do_arquivo = f"{função_analisada.__name__} - "
    nome_do_arquivo += f"{id_}".zfill(3)
    return f"{caminho}/{nome_do_arquivo}"
