#!/bin/bash

### GIT FILTER-REPO ###

## NÃO EXECUTE ESSE SCRIPT DIRETAMENTE
## Esse script foi feito para uso do
## script 'trybe-publisher' fornecido 
## pela Trybe. 

[[ $# == 1 ]] && \
[[ $1 == "trybe-security-parameter" ]] && \
git filter-repo \
    --path .trybe \
    --path .github \
    --path .vscode \
    --path trybe.yml \
    --path trybe-filter-repo.sh \
    --path tests/test_file_management.py \
    --path tests/test_file_process.py \
    --path tests/test_word_search.py \
    --path tests/test_queue.py \
    --path tests/priority_queue/mocks.py \
    --path tests/priority_queue/conftest.py \
    --path README.md \
    --invert-paths --force --quiet
