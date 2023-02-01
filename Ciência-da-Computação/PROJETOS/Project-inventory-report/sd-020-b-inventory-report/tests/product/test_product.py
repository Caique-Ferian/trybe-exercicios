from inventory_report.inventory.product import Product


def test_cria_produto():
    "Verifica os tipos de parametros"
    "utilizados para criar uma instância de Product"
    product = Product(
        id=1,
        nome_da_empresa="Trybe",
        nome_do_produto="Curso de Desenvolvimento Web",
        data_de_fabricacao="12/01/2023",
        data_de_validade="indefinido",
        numero_de_serie="123456789",
        instrucoes_de_armazenamento="Estudar com cuidado",
    )
    assert isinstance(product, Product)
    assert type(product.id) is int and product.id == 1
    assert (
        type(product.nome_da_empresa) is str
        and product.nome_da_empresa == "Trybe"
    )
    assert (
        type(product.nome_do_produto) is str
        and product.nome_do_produto == "Curso de Desenvolvimento Web"
    )
    assert (
        type(product.data_de_fabricacao) is str
        and product.data_de_fabricacao == "12/01/2023"
    )
    assert (
        type(product.data_de_validade) is str
        and product.data_de_validade == "indefinido"
    )
    assert (
        type(product.numero_de_serie) is str
        and product.numero_de_serie == "123456789"
    )
    assert (
        type(product.instrucoes_de_armazenamento) is str
        and product.instrucoes_de_armazenamento == "Estudar com cuidado"
    )
