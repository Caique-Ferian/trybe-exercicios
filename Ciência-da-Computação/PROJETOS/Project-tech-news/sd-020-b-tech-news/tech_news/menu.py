import sys
from tech_news.scraper import get_tech_news
from tech_news.analyzer.search_engine import (
    search_by_title,
    search_by_date,
    search_by_tag,
    search_by_category,
)
from tech_news.analyzer.ratings import top_5_news, top_5_categories


def another_options(menu):
    if menu == "4":
        what_category = input("Digite a categoria: ")
        print(search_by_category(what_category))
    elif menu == "5":
        print(top_5_news())
    elif menu == "6":
        print(top_5_categories())
    elif menu == "7":
        print("Encerrando script")
    else:
        print("Opção inválida", file=sys.stderr)


# Requisito 12
def analyzer_menu():
    menu = input(
        """ Selecione uma das opções a seguir:
 0 - Popular o banco com notícias;
 1 - Buscar notícias por título;
 2 - Buscar notícias por data;
 3 - Buscar notícias por tag;
 4 - Buscar notícias por categoria;
 5 - Listar top 5 notícias;
 6 - Listar top 5 categorias;
 7 - Sair."""
    )
    if menu == "0":
        how_many = input("Digite quantas notícias serão buscadas: ")
        print(get_tech_news(int(how_many)))
    elif menu == "1":
        what_title = input("Digite o título: ")
        print(search_by_title(what_title))
    elif menu == "2":
        what_date = input("Digite a data no formato aaaa-mm-dd: ")
        print(search_by_date(what_date))
    elif menu == "3":
        what_tag = input("Digite a tag: ")
        print(search_by_tag(what_tag))
    else:
        another_options(menu)
