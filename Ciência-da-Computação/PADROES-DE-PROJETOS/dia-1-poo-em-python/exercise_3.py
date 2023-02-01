from abc import ABC, abstractmethod
from math import pi


class FiguraGeometrica(ABC):
    @abstractmethod
    def area(self):
        raise NotImplementedError

    @abstractmethod
    def perimetro(self):
        raise NotImplementedError


class Quadrado(FiguraGeometrica):
    def __init__(self, lado):
        self.lado = lado

    def area(self):
        return self.lado**2

    def perimetro(self):
        return 4 * self.lado


class Retangulo(FiguraGeometrica):
    def __init__(self, base, altura):
        self.base = base
        self.altura = altura

    def area(self):
        return self.base * self.altura

    def perimetro(self):
        return 2 * (self.base + self.altura)


class Circulo(FiguraGeometrica):
    def __init__(self, raio):
        self.raio = raio

    def area(self):
        return pi * (self.raio**2)

    def perimetro(self):
        return 2 * pi * self.raio


quadrado = Quadrado(2)
print(
    f"""Um quadrado de {quadrado.lado} de lado tem:
  - Área: {quadrado.area()}
  - Perimetro: {quadrado.perimetro()}
  """
)

retangulo = Retangulo(4, 2)
print(
    f"""Um retângulo de base {retangulo.base} e altura {retangulo.altura} tem:
  - Área: {retangulo.area()}
  - Perimetro: {retangulo.perimetro()}
  """
)

circulo = Circulo(2)
print(
    f"""Um círculo de raio {circulo.raio} tem:
  - Área: {circulo.area()}
  - Perimetro: {circulo.perimetro()}
  """
)
