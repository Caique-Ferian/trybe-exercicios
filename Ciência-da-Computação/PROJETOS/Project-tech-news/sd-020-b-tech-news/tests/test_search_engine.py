from tech_news.analyzer.search_engine import (
    search_by_title,
    search_by_date,
    search_by_tag,
    search_by_category,
)
import pytest

from tech_news.database import db

from tests.news import NEWS, EXPECTED_NEWS

NEW_NOTICE_1 = NEWS[1]
NEW_NOTICE_2 = NEWS[2]
EXPECTED_NOTICE_1 = EXPECTED_NEWS[1]
EXPECTED_NOTICE_2 = EXPECTED_NEWS[2]


def test_search_news_by_title():
    inputs = ["bacana", "BACANA", "2", "Titulo invalido"]
    expects = [
        [EXPECTED_NOTICE_1, EXPECTED_NOTICE_2],
        [EXPECTED_NOTICE_1, EXPECTED_NOTICE_2],
        [EXPECTED_NOTICE_2],
        [],
    ]

    for actual, expect in zip(inputs, expects):
        db.news.delete_many({})
        db.news.insert_one(NEW_NOTICE_1)
        db.news.insert_one(NEW_NOTICE_2)
        assert search_by_title(actual) == expect


def test_search_news_by_date():
    inputs = ["2021-04-04", "2022-04-07", "2023-05-14"]
    expects = [
        [EXPECTED_NOTICE_1],
        [EXPECTED_NOTICE_2],
        [],
    ]

    for actual, expect in zip(inputs, expects):
        db.news.delete_many({})
        db.news.insert_one(NEW_NOTICE_1)
        db.news.insert_one(NEW_NOTICE_2)
        assert search_by_date(actual) == expect

    inputs = [
        "21-12-1980",
        "2001-02-31",
        "2020-31-02",
        "1988-14-25",
        "1997-02-31",
    ]

    for actual in inputs:
        db.news.delete_many({})
        db.news.insert_one(NEW_NOTICE_1)
        db.news.insert_one(NEW_NOTICE_2)
        with pytest.raises(ValueError, match="Data inválida"):
            search_by_date(actual)


def test_search_news_by_tag():
    inputs = ["Tecnologia", "TECNOLOGIA", "Esportes", "Aloha"]
    expects = [
        [EXPECTED_NOTICE_1, EXPECTED_NOTICE_2],
        [EXPECTED_NOTICE_1, EXPECTED_NOTICE_2],
        [EXPECTED_NOTICE_1],
        [],
    ]

    for actual, expect in zip(inputs, expects):
        db.news.delete_many({})
        db.news.insert_one(NEW_NOTICE_1)
        db.news.insert_one(NEW_NOTICE_2)
        assert search_by_tag(actual) == expect


def test_search_news_by_category():
    inputs = ["Ferramentas", "FERRAMENTAS", "Novidades", "Aloha"]
    expects = [
        [EXPECTED_NOTICE_1],
        [EXPECTED_NOTICE_1],
        [EXPECTED_NOTICE_2],
        [],
    ]

    for actual, expect in zip(inputs, expects):
        db.news.delete_many({})
        db.news.insert_one(NEW_NOTICE_1)
        db.news.insert_one(NEW_NOTICE_2)
        assert search_by_category(actual) == expect
