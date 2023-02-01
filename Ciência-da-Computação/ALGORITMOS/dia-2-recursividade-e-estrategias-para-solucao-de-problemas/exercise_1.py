def conta_pares(n):
    total_de_pares = 0
    while n > 0:
        if n % 2 == 0:
            total_de_pares += 1
        n -= 1
    return total_de_pares
