# from simple_report import SimpleReport

from inventory_report.reports.simple_report import SimpleReport


class CompleteReport(SimpleReport):
    @staticmethod
    def generate(products):
        simple_report = super(CompleteReport, CompleteReport).generate(
            products
        )
        count_companies = super(
            CompleteReport, CompleteReport
        ).count_companies(products)
        companies_products = ""

        for name, quantity in count_companies.items():
            companies_products += f"- {name}: {quantity}\n"

        return (
            f"{simple_report}\n"
            f"Produtos estocados por empresa:\n"
            f"{companies_products}"
        )
