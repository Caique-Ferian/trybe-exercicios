def tem_divisor(n, i, j):
    if i > j:
        return False
    elif n % i == 0:
        return True
    else:
        return tem_divisor(n, i + 1, j)


def numero_primo(n):
    return n > 1 and not tem_divisor(n, 2, n - 1)


print(numero_primo(4))
