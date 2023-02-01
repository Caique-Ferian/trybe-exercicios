from inventory_report.importer.importer import Importer
import xml.etree.ElementTree as ET


class XmlImporter(Importer):
    @staticmethod
    def import_data(path):
        products = []
        with open(path, "r") as file:
            if path.endswith(".xml"):
                root = ET.parse(file).getroot()
                content = {}
                for node in root:
                    for values in node:
                        if values.tag == "id" and values.text != "1":
                            products.append(content)
                            content = {}
                        content[values.tag] = values.text
                products.append(content)
            else:
                raise ValueError("Arquivo inválido")
        return products
