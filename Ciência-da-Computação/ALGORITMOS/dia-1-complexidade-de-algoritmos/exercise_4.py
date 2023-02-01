def kids_with_candies(candies, extra_candies):
    # parece que a solução percorre o array somente uma vez,
    # porém isto é feito duas vezes, uma no `max` e outra para
    # preencher a resposta
    max_candies = max(candies)
    return [candy + extra_candies >= max_candies for candy in candies]


# saída: [True, True, True, False, True]
print(kids_with_candies([2, 3, 5, 1, 3], 3))


# Este código possui complexidade de tempo = O(n) (percorre uma vez com max) +
# O(n), logo 2 O(n), como o número constante em arrays gigantes não é muito
# relevante a complexidade de tempo serio O(n), bem como a de espaço também
