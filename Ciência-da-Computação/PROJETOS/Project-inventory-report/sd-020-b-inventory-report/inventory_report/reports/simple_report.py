from datetime import date, timedelta
from collections import Counter


class SimpleReport:
    @staticmethod
    def generate(products):
        oldest_date = date.today()
        near_to_expire = date.today()
        expire_validation = timedelta(1000)
        company, _ = Counter(
            SimpleReport.count_companies(products)
        ).most_common()[0]
        for product in products:
            if date.fromisoformat(product["data_de_fabricacao"]) < oldest_date:
                oldest_date = date.fromisoformat(product["data_de_fabricacao"])
            if (
                abs(
                    date.fromisoformat(product["data_de_validade"])
                    - date.today()
                )
                < expire_validation
            ):
                expire_validation = abs(
                    date.fromisoformat(product["data_de_validade"])
                    - date.today()
                )
                near_to_expire = product["data_de_validade"]

        return (
            f"Data de fabricação mais antiga: {oldest_date}\n"
            f"Data de validade mais próxima: {near_to_expire}\n"
            f"Empresa com mais produtos: {company}"
        )

    @staticmethod
    def count_companies(products):
        companies = {}
        for product in products:
            if product["nome_da_empresa"] not in companies:
                companies[product["nome_da_empresa"]] = 0
            companies[product["nome_da_empresa"]] += 1
        return companies
