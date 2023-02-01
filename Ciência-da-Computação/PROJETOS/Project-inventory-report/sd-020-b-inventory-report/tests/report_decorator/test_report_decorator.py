from inventory_report.reports.colored_report import ColoredReport
from inventory_report.reports.simple_report import SimpleReport


def test_decorar_relatorio():
    product = [
        {
            "id": 1,
            "nome_do_produto": "farinha",
            "nome_da_empresa": "Farinini",
            "data_de_fabricacao": "2022-05-10",
            "data_de_validade": "2021-06-14",
            "numero_de_serie": "123456789",
            "instrucoes_de_armazenamento": "ao abrigo de luz",
        }
    ]
    colored_report = ColoredReport(SimpleReport()).generate(product)
    list_str_tuple = [
        ("Data de fabricação mais antiga:", "2022-05-10"),
        ("Data de validade mais próxima:", "2021-06-14"),
        ("Empresa com mais produtos:", "Farinini"),
    ]
    expects = []
    for context, value in list_str_tuple:
        if value != "Farinini":
            expects.append(
                f"\033[32m{context}\033[0m \033[36m{value}\033[0m\n"
            )
        else:
            expects.append(f"\033[32m{context}\033[0m \033[31m{value}\033[0m")

    assert expects[0] + expects[1] + expects[2] == colored_report
