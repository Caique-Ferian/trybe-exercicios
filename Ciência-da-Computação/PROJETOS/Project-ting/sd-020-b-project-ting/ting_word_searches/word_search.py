
def verify_file(file, word, list_to_add, type='NO_CONTENT'):
    ocorrencias = []
    content = file["linhas_do_arquivo"]
    for index in range(len(content)):
        if content[index].lower().find(word.lower()) != -1:
            if type == 'NO_CONTENT':
                ocorrencias.append(
                    {"linha": index + 1}
                )
            else:
                ocorrencias.append(
                    {"linha": index + 1, 'conteudo': content[index]}
                )
    if len(ocorrencias) > 0:
        file_dict = {
            "palavra": word,
            "arquivo": file["nome_do_arquivo"],
            "ocorrencias": ocorrencias,
        }
        list_to_add.append(file_dict)


def exists_word(word, instance):
    queue = instance.__get__()
    result = []
    for file in queue:
        verify_file(file, word, result)
    return result


def search_by_word(word, instance):
    queue = instance.__get__()
    result = []
    for file in queue:
        verify_file(file, word, result, 'WITH_CONTENT')
    return result
