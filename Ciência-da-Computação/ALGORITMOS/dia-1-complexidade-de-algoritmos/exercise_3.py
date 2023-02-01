import random


def numbers_array(n):
    list_average = []

    for _ in range(100):  # O(1)
        average = 0
        for _ in range(n):  # O(n)
            average += random.randrange(1, n)
            list_average.append(average / n)
    return list_average


# Em quesito de complexidade de tempo a gasto de tempo cresce com o crescimento
# da entrada 0(n), porém em quesito de complexidade de espaço o que será
# armazenado sempre será uma array de 100 números, logo O(1)
