import csv
import json
import xml.etree.ElementTree as ET

from inventory_report.reports.simple_report import SimpleReport
from inventory_report.reports.complete_report import CompleteReport


class Inventory:
    products = []

    @staticmethod
    def send_report(type, products):
        if type == "simples":
            return SimpleReport.generate(products)
        else:
            return CompleteReport.generate(products)

    @staticmethod
    def read_csv(file):
        content = csv.DictReader(file, delimiter=",", quotechar='"')
        for line in content:
            Inventory.products.append(line)

    @staticmethod
    def read_json(file):
        content = json.load(file)
        for line in content:
            Inventory.products.append(line)

    @staticmethod
    def read_xml(file):
        root = ET.parse(file).getroot()
        content = {}
        for node in root:
            for values in node:
                if values.tag == "id" and values.text != "1":
                    Inventory.products.append(content)
                    content = {}
                content[values.tag] = values.text
        Inventory.products.append(content)

    @staticmethod
    def import_data(path, type):
        Inventory.products = []
        with open(path, "r") as file:
            if path.endswith(".csv"):
                Inventory.read_csv(file)
            elif path.endswith(".json"):
                Inventory.read_json(file)
            elif path.endswith(".xml"):
                Inventory.read_xml(file)
            return Inventory.send_report(type, Inventory.products)
