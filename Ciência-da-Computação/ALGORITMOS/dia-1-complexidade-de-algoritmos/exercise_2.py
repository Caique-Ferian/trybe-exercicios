entrada = [[0, 0, 0, 0, 1], [0, 0, 0, 0, 1], [1, 1, 1, 1, 1], [0, 0, 0, 1, 0]]

# resultado para (0, 4) = True
# resultado para (1, 1) = False


def battleship(grid, x, y):
    if grid[x][y] == 1:
        return True
    return False


# Mesmo sendo um array bidimensional, o código acima possui complexidade O(1),
# Ou seja ele tem uma complexidade constante pois como se informa para ele as
# cordenadas desejada e o Campo, ele apenas procurará nas coordenadas
# fornecidas ele não precisa percorrer o array todo apenas buscar nas posições
# fornecidadas logo independemente do tamanho da entrada a saída é sempre
# constante.
