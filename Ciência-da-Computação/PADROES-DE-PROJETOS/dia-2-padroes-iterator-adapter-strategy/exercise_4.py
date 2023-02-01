from abc import abstractmethod, ABC
from collections.abc import Iterator, Iterable


class Carta:
    def __init__(self, valor, naipe):
        self.valor = valor
        self.naipe = naipe

    def __repr__(self):
        return "<%s de %s>" % (self.valor, self.naipe)


class Estrategia(ABC):
    @classmethod
    @abstractmethod
    def proxima_carta(cls):
        raise NotImplementedError


class EstrategiaRegular(Estrategia):
    @classmethod
    def proxima_carta(cls):
        return 1


class EstrategiaInversa(Estrategia):
    @classmethod
    def proxima_carta(cls):
        return -1


class BaralhoIterator(Iterator):
    def __init__(self, cartas, pos, estrategia):
        self._cartas = cartas
        self.pos = pos
        self.estrategia = estrategia

    def __next__(self):
        try:
            carta = self._cartas[self.pos]
        except IndexError:
            raise StopIteration()
        else:
            self.pos += self.estrategia.proxima_carta()
            return carta


class Baralho(Iterable):
    naipes = "copas ouros espadas paus".split()
    valores = "A 2 3 4 5 6 7 8 9 10 J Q K".split()

    def __init__(self, pos, iterador):
        self._cartas = [
            Carta(valor, naipe)
            for naipe in self.naipes
            for valor in self.valores
        ]
        self._pos = pos
        self._iterador = iterador

    def __len__(self):
        return len(self._cartas)

    def __iter__(self):
        return BaralhoIterator(self._cartas, self._pos, self._iterador)


if __name__ == "__main__":
    baralho_inverso = Baralho(-1, EstrategiaInversa())
    print("Estratégia Inversa")
    for carta in baralho_inverso:
        print(carta)
    print("")
    print("Estratégia Regular")
    baralho_regular = Baralho(0, EstrategiaRegular())
    for carta in baralho_regular:
        print(carta)
