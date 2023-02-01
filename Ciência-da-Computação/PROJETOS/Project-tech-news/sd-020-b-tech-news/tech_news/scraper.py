import requests
import time
from parsel import Selector
import re

from tech_news.database import create_news


# Requisito 1
def fetch(url):
    try:
        time.sleep(1)
        response = requests.get(
            url,
            headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X)"},
            timeout=3,
        )

    except requests.exceptions.ReadTimeout:
        return None
    else:
        if response.status_code == 200:
            return response.text
        return None


# Requisito 2
def scrape_updates(html_content):
    selector = Selector(text=html_content)
    links = selector.css(".cs-overlay a::attr(href)").getall()
    return links


# Requisito 3
def scrape_next_page_link(html_content):
    selector = Selector(text=html_content)
    next_page = selector.css(".nav-links a::attr(href)").getall()
    if len(next_page) == 0:
        return None
    return next_page[len(next_page) - 1]


# Requisito 4
def scrape_news(html_content):
    CLEANER = re.compile("<.*?>")
    selector = Selector(text=html_content)
    url = selector.css("link[rel='canonical']::attr(href)").get()
    title = selector.css(".entry-header-inner h1::text").get().strip()
    timestamp = selector.css(".entry-header-inner ul li::text").get()
    writer = selector.css(".entry-header-inner ul li a::text").get()
    has_comments = selector.css(".post-comments h5::text").getall()
    comments_count = 0
    summary = selector.css(".entry-content p").get()
    tags = selector.css(".post-tags ul li a *::text").getall()
    category = selector.css(".meta-category a span::text").getall()
    if len(has_comments) != 0:
        comments_count = int(has_comments[0][4])
    return {
        "url": url,
        "title": title,
        "timestamp": timestamp,
        "writer": writer,
        "comments_count": comments_count,
        "summary": re.sub(CLEANER, "", summary).strip(),
        "tags": tags,
        "category": category[1],
    }


# Requisito 5
def get_tech_news(amount):
    url = "https://blog.betrybe.com"
    all_news = []
    while amount > 0:
        response = fetch(url)
        links = scrape_updates(response)[:amount]
        for link in links:
            to_tech_new = fetch(link)
            tech_new = scrape_news(to_tech_new)
            all_news.append(tech_new)
        url = scrape_next_page_link(response)
        amount -= len(links)

    create_news(all_news)
    return all_news
