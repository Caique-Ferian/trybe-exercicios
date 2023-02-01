def mocked_fetch(url: str):
    """Fake-fetches html from local file caches"""
    base_path = "tests/assets/trybe_pages"
    pages = {
        "https://blog.betrybe.com": f"{base_path}/novidades.html",
        "https://blog.betrybe.com/": f"{base_path}/novidades.html",
        "https://blog.betrybe.com/page/2": f"{base_path}/novidades_2.html",
        "https://blog.betrybe.com/page/2/": f"{base_path}/novidades_2.html",
        "https://blog.betrybe.com/page/3": f"{base_path}/novidades_3.html",
        "https://blog.betrybe.com/page/3/": f"{base_path}/novidades_3.html",
        "https://blog.betrybe.com/page/4": f"{base_path}/novidades_4.html",
        "https://blog.betrybe.com/page/4/": f"{base_path}/novidades_4.html",
    }
    path = pages.get(url)
    if path is None:
        new_url = url.replace("https://blog.betrybe.com", "")
        skip = new_url.find("/", new_url.find("/") + 1)
        path = f"{base_path}/noticias/{new_url[skip+1:-1]}.html"
    try:
        with open(path) as cached_html:
            return cached_html.read()
    except FileNotFoundError:
        raise FileNotFoundError(f"{url} | {new_url} | {path}")
