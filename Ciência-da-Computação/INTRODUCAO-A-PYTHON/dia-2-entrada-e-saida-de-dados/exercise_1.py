def print_name(name: str) -> None:
    for removed_letter in range(len(name)):
        for letter in range(len(name) - removed_letter):
            print(name[letter], end="")
        print()


print_name("PEDRO")
