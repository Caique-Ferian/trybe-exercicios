def fuel_price(volume: int, type: str) -> float | None:
    A_PRICE = 1.9
    G_PRICE = 2.5
    total = 0

    if type == "A":
        if 0 <= volume <= 20:
            total = (volume * A_PRICE) * 0.97
        else:
            total = (volume * A_PRICE) * 0.95
    elif type == "G":
        if 0 <= volume <= 20:
            total += (volume * G_PRICE) * 0.96
        else:
            total += (volume * G_PRICE) * 0.94
    else:
        return print(
            "Não existe o combustível informado,"
            ' informe "G" para Gasolina ou "A" para Álcool'
        )
    return total


print(fuel_price(10, "A"))
