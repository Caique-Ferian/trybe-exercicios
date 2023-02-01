from inventory_report.importer.importer import Importer
import csv


class CsvImporter(Importer):
    @staticmethod
    def import_data(path):
        products = []
        with open(path, "r") as file:
            if path.endswith(".csv"):
                content = csv.DictReader(file, delimiter=",", quotechar='"')
                for line in content:
                    products.append(line)
            else:
                raise ValueError("Arquivo inválido")
        return products
