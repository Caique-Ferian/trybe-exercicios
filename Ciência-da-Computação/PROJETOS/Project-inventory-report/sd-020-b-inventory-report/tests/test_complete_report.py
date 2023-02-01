import itertools
from datetime import datetime, timedelta

import pytest
from faker import Faker

from inventory_report.reports.complete_report import CompleteReport
from tests.factories.product_factory import ProductFactory

faker = Faker("pt-BR")

old_date = faker.past_date()
future_date = faker.future_date() + timedelta(days=20)

oldest_date = old_date - timedelta(days=30)
closest_date = datetime.today().date() + timedelta(days=10)
company_bigger_stock = faker.company()


@pytest.fixture
def stock():
    return [
        vars(
            ProductFactory(
                nome_da_empresa=company_bigger_stock,
                data_de_fabricacao=str(old_date),
                data_de_validade=str(future_date),
            )
        ),
        vars(
            ProductFactory(
                nome_da_empresa=company_bigger_stock,
                data_de_fabricacao=str(old_date),
                data_de_validade=str(future_date),
            )
        ),
        vars(
            ProductFactory(
                data_de_fabricacao=str(old_date),
                data_de_validade=str(future_date),
                nome_da_empresa=company_bigger_stock[
                    : len(company_bigger_stock) // 2
                ],
            )
        ),
        vars(
            ProductFactory(
                nome_da_empresa=company_bigger_stock + " LIMITED",
                data_de_fabricacao=str(oldest_date),
                data_de_validade=str(closest_date),
            )
        ),
    ]


@pytest.mark.dependency()
def test_validar_completereport_retorna_data_de_fabricacao_mais_antiga(stock):
    for stk in itertools.permutations(stock):
        report = CompleteReport.generate(stk)  # type: ignore
        assert f"Data de fabricação mais antiga: {oldest_date}" in report


@pytest.mark.dependency()
def test_validar_completereport_retorna_validade_mais_proxima(stock):
    for stk in itertools.permutations(stock):
        report = CompleteReport.generate(stk)  # type: ignore
        assert f"Data de validade mais próxima: {closest_date}" in report


@pytest.mark.dependency()
def test_validar_completereport_retorna_empresa_com_maior_estoque(stock):
    for stk in itertools.permutations(stock):
        report = CompleteReport.generate(stk)  # type: ignore
        expected = f"Empresa com mais produtos: {company_bigger_stock}"
        assert expected in report


@pytest.mark.dependency()
def test_validar_completereport_retorna_quantidade_de_estoque_correto(stock):
    for stk in itertools.permutations(stock):
        report = CompleteReport.generate(stk)  # type: ignore

        expected = [
            "Produtos estocados por empresa:\n",
            f"- {company_bigger_stock}: 2\n",
            f"- {stock[2]['nome_da_empresa']}: 1\n",
            f"- {stock[3]['nome_da_empresa']}: 1\n",
        ]
        for expect in expected:
            assert expect in report


@pytest.mark.dependency()
def test_validar_completereport_retorna_formato_correto(stock):
    for stk in itertools.permutations(stock):
        report = CompleteReport.generate(stk)  # type: ignore
        expect_start = (
            f"Data de fabricação mais antiga: {oldest_date}\n"
            f"Data de validade mais próxima: {closest_date}\n"
            f"Empresa com mais produtos: {company_bigger_stock}\n"
            f"Produtos estocados por empresa:\n"
        )
        expected = [
            f"- {company_bigger_stock}: 2\n",
            f"- {stock[2]['nome_da_empresa']}: 1\n",
            f"- {stock[3]['nome_da_empresa']}: 1\n",
        ]
        assert report.startswith(expect_start)
        for expect in expected:
            assert expect in report


@pytest.mark.dependency(
    depends=[
        "test_validar_completereport_retorna_data_de_fabricacao_mais_antiga",
        "test_validar_completereport_retorna_validade_mais_proxima",
        "test_validar_completereport_retorna_empresa_com_maior_estoque",
        "test_validar_completereport_retorna_quantidade_de_estoque_correto",
        "test_validar_completereport_retorna_formato_correto",
    ]
)
def test_metodo_generate_de_completereport_retorna_informacoes_completas():
    pass
