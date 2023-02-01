from tech_news.scraper import (
    fetch,
    scrape_updates,
    scrape_news,
    scrape_next_page_link,
    get_tech_news,
)
from tech_news.database import db
from tests.assets.test_assets import (
    all_news,
    urls_from_novidades,
)
import os
import time
import pickle
from requests.exceptions import ReadTimeout
from tests.utils import mocked_fetch

ASSETS_PATH = "tests/assets"
NOTICIAS_PATH = f"{ASSETS_PATH}/trybe_pages/noticias"


# Req.1
def test_fetch(mocker):
    # executada com uma URL correta retorna o conteúdo html
    path = "tests/assets/betrybe_response.pickle"
    with open(path, "rb") as response_file:
        response = pickle.load(response_file)
    mocker.patch("requests.get", return_value=response)
    result = fetch("https://app.betrybe.com/")
    assert result is not None
    assert "<!doctype html>" in result
    content = (
        "Aprenda a programar com uma formação de alta"
        " qualidade e só comece a pagar quando conseguir um bom"
        " trabalho."
    )
    assert content in result

    # sofrendo timeout, retorna None
    mocker.patch("requests.get", side_effect=ReadTimeout)
    assert fetch("https://httpbin.org/delay/5") is None

    # retorna None quando recebe uma resposta com código
    # diferente de 200
    path = "tests/assets/404_response.pickle"
    with open(path, "rb") as response_file:
        response = pickle.load(response_file)
    mocker.patch("requests.get", return_value=response)
    assert fetch("https://httpbin.org/status/404") is None

    # respeita o rate limit
    mocker.patch("requests.get")
    start = time.time()
    request_counter = 0
    while (time.time() - start) < 4:
        fetch("http://www.google.com.br")
        request_counter += 1
    assert request_counter <= 5


# Req.2
def test_scrape_updates():
    with open("tests/assets/trybe_pages/novidades.html") as f:
        html_content = f.read()
    expected = urls_from_novidades
    # retorna os dados esperados quando chamada com os parâmetros corretos
    assert scrape_updates(html_content) == expected
    # retorna uma lista vazia quando chamada com parâmetros incorretos
    assert scrape_updates("") == []


# Req.3
def test_scrape_next_page_link():
    with open("tests/assets/trybe_pages/novidades.html") as f:
        first_page = f.read()
    with open("tests/assets/trybe_pages/novidades_2.html") as f:
        second_page = f.read()
    first_expected = "https://blog.betrybe.com/page/2/"
    second_expected = "https://blog.betrybe.com/page/3/"
    # retorna os dados esperados quando chamada com os parâmetros corretos
    assert scrape_next_page_link(first_page) == first_expected
    assert scrape_next_page_link(second_page) == second_expected
    # retorna None quando chamada com os parâmetros incorretos
    assert scrape_next_page_link("") is None


# Req.4
def test_scrape_news():
    news = []
    for new in os.listdir(NOTICIAS_PATH):
        with open(f"{NOTICIAS_PATH}/{new}") as f:
            news.append(f.read())

    sorted_news = sorted(news, key=lambda x: x)
    sorted_all_news = sorted(all_news, key=lambda x: x["title"])

    for new, expected in zip(sorted_news, sorted_all_news):
        assert scrape_news(new) == expected


# Req.5
def test_get_tech_news(mocker):
    # Arrange
    db.news.drop()
    mocker.patch("tech_news.scraper.fetch", new=mocked_fetch)

    for amount in [1, 5, 13, 30]:
        # Act
        mocked_create_news = mocker.patch("tech_news.scraper.create_news")
        result = get_tech_news(amount)
        mocked_create_news.assert_called_once_with(result)

        # Assert
        # A função retorna a quantidade correta de notícias
        assert result == all_news[:amount]  # resultados originais
