from ting_file_management.file_management import txt_importer
import sys


def process(path_file, instance):
    content = txt_importer(path_file)
    content_to_dict = {
        "nome_do_arquivo": path_file,
        "qtd_linhas": len(content),
        "linhas_do_arquivo": content,
    }
    files = [file["nome_do_arquivo"] for file in instance.__get__()]
    if content_to_dict["nome_do_arquivo"] not in files:
        instance.enqueue(content_to_dict)
        print(content_to_dict, file=sys.stdout)


def remove(instance):
    if len(instance) == 0:
        print("Não há elementos", file=sys.stdout)
    else:
        file_removed = instance.dequeue()
        print(
            f'Arquivo {file_removed["nome_do_arquivo"]} removido com sucesso',
            file=sys.stdout,
        )


def file_metadata(instance, position):
    if position not in range(0, len(instance)):
        print("Posição inválida", file=sys.stderr)
    else:
        print(f"{instance.search(position)}")
