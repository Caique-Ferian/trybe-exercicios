from inventory_report.importer.importer import Importer
import json


class JsonImporter(Importer):
    @staticmethod
    def import_data(path):
        products = []
        with open(path, "r") as file:
            if path.endswith(".json"):
                content = json.load(file)
                for line in content:
                    products.append(line)
            else:
                raise ValueError("Arquivo inválido")
        return products
