def conta_pares_recursivo(n):
    if n == 0:
        return 0
    elif n % 2 == 0:
        return 1 + conta_pares_recursivo(n - 1)
    else:
        return conta_pares_recursivo(n - 1)


print(conta_pares_recursivo(10))
