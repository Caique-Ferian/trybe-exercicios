from abc import abstractmethod, ABC


class EstrategiaDeImposto(ABC):
    @classmethod
    @abstractmethod
    def calcula(cls, valor):
        raise NotImplementedError


class ISS(EstrategiaDeImposto):
    @classmethod
    def calcula(cls, valor):
        return valor * 0.1


class ICMS(EstrategiaDeImposto):
    @classmethod
    def calcula(cls, valor):
        return valor * 0.06


class PIS(EstrategiaDeImposto):
    @classmethod
    def calcula(cls, valor):
        return valor * 0.0065


class COFINS(EstrategiaDeImposto):
    @classmethod
    def calcula(cls, valor):
        return valor * 0.03


class Orcamento:
    def __init__(self, valor, imposto):
        self.valor = valor
        self.imposto = imposto

    def calcular_imposto(self):
        return self.imposto.calcula(self.valor)


iss = ISS()
orcamento_iss = Orcamento(1000, iss)
print(f"ISS: {orcamento_iss.calcular_imposto()}")
icms = ICMS()
orcamento_icms = Orcamento(1000, icms)
print(f"ICMS: {orcamento_icms.calcular_imposto()}")
pis = PIS()
orcamento_pis = Orcamento(1000, pis)
print(f"PIS: {orcamento_pis.calcular_imposto()}")
cofins = COFINS()
orcamento_cofins = Orcamento(1000, cofins)
print(f"COFINS: {orcamento_cofins.calcular_imposto()}")
