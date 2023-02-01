import json
import random


def shot_pokemon_game(name):
    num_shots = 0
    while True:
        num_shots += 1
        shot = input("Quem é esse pokemon? ")
        if shot == name:
            print("Você acertou! Parabéns!")
            break
        elif num_shots == len(name):
            print("Você errou! O Pokemon era ", name)
            break
        else:
            print("Dica: ", end="")
            for letter in range(0, num_shots):
                print(name[letter], end="")
            print("")


if __name__ == "__main__":
    with open("pokemons.json", "r") as file:
        data = json.load(file)["results"]
        random_pokemon = random.choice(data)["name"]
        shot_pokemon_game(random_pokemon)
