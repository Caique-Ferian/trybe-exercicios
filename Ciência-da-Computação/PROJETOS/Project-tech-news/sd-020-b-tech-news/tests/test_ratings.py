from tech_news.analyzer.ratings import top_5_news, top_5_categories
from tech_news.database import db
from tests.news import NEWS, EXPECTED_NEWS


# Req.10
def test_list_top_five_news():
    db.news.delete_many({})

    # é possível buscar as cinco top 5 notícias
    db.news.insert_many(NEWS)
    assert top_5_news() == [EXPECTED_NEWS[i] for i in [8, 7, 9, 1, 0]]

    # caso houver menos de 5 notícias, serão retornadas quantas houverem
    db.news.delete_many({})
    db.news.insert_many(NEWS[:3])
    assert top_5_news() == [EXPECTED_NEWS[i] for i in [1, 0, 2]]

    # retornar vazio caso nao exista noticias
    db.news.delete_many({})
    assert top_5_news() == []


# Req.11
def test_list_top_five_categories():
    db.news.delete_many({})

    # é possível buscar as cinco top 5 categorias
    db.news.insert_many(NEWS)
    assert top_5_categories() == [
        "Ferramentas",
        "Categoria_0",
        "Categoria_7",
        "Novidades",
        "Categoria_9",
    ]

    # caso houver menos de 5 categorias, serão retornadas quantas houverem
    db.news.delete_many({})
    db.news.insert_many(NEWS[:-1])

    assert top_5_categories() == [
        "Ferramentas",
        "Categoria_0",
        "Categoria_7",
        "Novidades",
    ]

    # buscar top categorias retornar vazio caso nao exista noticias
    db.news.delete_many({})
    assert top_5_categories() == []
