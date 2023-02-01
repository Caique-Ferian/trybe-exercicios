from collections.abc import Iterator
from exercise_2 import Baralho


class BaralhoInversoIterator(Iterator):
    def __init__(self, cartas):
        self._cartas = cartas
        self.pos = -1

    def __next__(self):
        try:
            carta = self._cartas[self.pos]
        except IndexError:
            raise StopIteration()
        else:
            self.pos -= 1
            return carta


class BaralhoInverso(Baralho):
    def __iter__(self):
        return BaralhoInversoIterator(self._cartas)


if __name__ == "__main__":
    baralho_inverso = BaralhoInverso()
    for carta in baralho_inverso:
        print(carta)
