def maior_numero_inteiro_aux(numbers, tamanho):
    if tamanho == 1:
        return numbers[0]
    else:
        maior_numero_inteiro = maior_numero_inteiro_aux(numbers, tamanho - 1)
        if maior_numero_inteiro > numbers[tamanho - 1]:
            return maior_numero_inteiro
        else:
            return numbers[tamanho - 1]


def maior_numero_inteiro(numbers):
    tamanho = len(numbers)
    return maior_numero_inteiro_aux(numbers, tamanho)
