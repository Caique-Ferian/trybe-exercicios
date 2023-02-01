import requests
import parsel

base_url = 'http://books.toscrape.com/catalogue/'
response = requests.get(base_url + 'the-grand-design_405/index.html')
selector = parsel.Selector(text=response.text)
title = selector.css('.product_main h1::text').get()
price = selector.css('.product_main p::text').re_first(r"\d*\.\d{2}")
# recupera a descrição do produto
# ~ significa a tag irmã
description = selector.css('#product_description ~ p::text').get()
suffix = '...more'
img_url = base_url + selector.css('.active img::attr(src)').get()
table = selector.css('.table tr  td::text').getall()

print(title,price,description[:-len(suffix)], img_url, table[5][10:11], sep=',')