Esta é a pasta de assets a serem utilizados durante os testes.

- .pickle
  - São respostas http da biblioteca requests, serializadas com a biblioteca Pickle para que possamos fazer os testes sem realizar requisições reais.
- cached_news.json
  - Contém o resultado final do scrape de várias notícias, para testarmos o funcionamento do scraper.
- test_assets.py
  - É onde carregamos o cached_news.json, e onde temos também os links das notícias encontradas na pagina Novidades, usados para testar o scrape.
- trybe_pages
  - Esta pasta contem páginas html obtidas do blog da trybe, para fazermos os nossos testes sem precisar mandar requisições reais para o site.
