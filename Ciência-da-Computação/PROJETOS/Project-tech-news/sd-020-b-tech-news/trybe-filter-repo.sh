### GIT FILTER-REPO ###

 ## NÃO EXECUTE ESSE SCRIPT DIRETAMENTE
 ## Esse script foi feito para uso do
 ## script 'publisher.sh' fornecido 
 ## pela Trybe. 

 [[ $# == 1 ]] && \
 [[ $1 == "trybe-security-parameter" ]] && \
 git filter-repo \
     --path .trybe \
     --path .vscode \
     --path .github \
     --path trybe.yml \
     --path trybe-filter-repo.sh \
     --path tests/test_menu.py \
     --path tests/test_ratings.py \
     --path tests/test_scraper.py \
     --path tests/test_search_engine.py \
     --path tests/generate_fixtures.py \
     --path tests/news.py \
     --path tests/utils.py \
     --path tests/assets* \
     --path teste_manual.gif \
     --path README.md \
     --invert-paths --force
