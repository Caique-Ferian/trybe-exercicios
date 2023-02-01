def bigger_name(names: list[str]) -> str:
    bigger = ""
    for name in names:
        if len(name) > len(bigger):
            bigger = name
    return bigger


print(bigger_name(["José", "Lucas", "Nádia", "Fernanda", "Cairo", "Joana"]))
