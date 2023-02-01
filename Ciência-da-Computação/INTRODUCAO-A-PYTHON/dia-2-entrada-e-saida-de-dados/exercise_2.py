import random

WORDS = [
    "cat",
    "elephant",
    "dog",
    "monkey",
    "duck",
    "chameleon",
    "bear",
    "moose",
    "rooster",
]
MAX_ATTEMPTS = 3


def draw_secret_word(words: list[str]) -> tuple:
    secret_word = random.choice(words)
    scramble_word = "".join(random.sample(secret_word, len(secret_word)))
    return secret_word, scramble_word


def game() -> list[str]:
    guesses = []
    for attempt in range(MAX_ATTEMPTS):
        guess = input("Guess the word: ")
        guesses.append(guess)
    return guesses


def check_game_result(secret_word: str, guesses: list[str]) -> None:
    if secret_word in guesses:
        print(f"You win: {secret_word}")
    else:
        print(f"You lose: {secret_word}")


if __name__ == "__main__":
    secret_word, scramble_word = draw_secret_word(WORDS)
    print(f"Scramble word is: {scramble_word}")
    guesses = game()
    check_game_result(secret_word, guesses)
