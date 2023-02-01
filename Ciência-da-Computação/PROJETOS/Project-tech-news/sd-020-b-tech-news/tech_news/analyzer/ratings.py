from tech_news.database import get_collection


# Requisito 10
def top_5_news():
    all_news = list(get_collection().find().sort("comments_count", -1))
    rating_news = []
    if len(all_news) < 5:
        rating_news = [(new["title"], new["url"]) for new in all_news]
    elif len(all_news) >= 5:
        rating_news = [
            (new["title"], new["url"])
            for index, new in enumerate(all_news)
            if index < 5
        ]
    return rating_news


# Requisito 11
def top_5_categories():
    pipelines = [
        {"$group": {"_id": "$category", "count": {"$sum": 1}}},
        {"$sort": {"count": -1, "_id": 1}},
    ]
    all_news_order_by_category = list(get_collection().aggregate(pipelines))
    return [
        new["_id"]
        for index, new in enumerate(all_news_order_by_category)
        if index < 5
    ]
