import sys
from inventory_report.inventory.inventory_refactor import InventoryRefactor
from inventory_report.importer.csv_importer import CsvImporter
from inventory_report.importer.json_importer import JsonImporter
from inventory_report.importer.xml_importer import XmlImporter


def select_importer(path):
    if path.endswith(".csv"):
        return InventoryRefactor(CsvImporter)
    elif path.endswith(".json"):
        return InventoryRefactor(JsonImporter)
    elif path.endswith(".xml"):
        return InventoryRefactor(XmlImporter)


def main():
    try:
        _, path, type_report = sys.argv
        inventory = select_importer(path)
    except ValueError:
        print("Verifique os argumentos", file=sys.stderr)
    else:
        print(inventory.import_data(path, type_report), end="")
