def suffle(cards):
    cards_suffled = []
    div_cards_by_two = len(cards) // 2

    for index in range(div_cards_by_two):
        cards_suffled.extend(cards[index::div_cards_by_two])
    return cards_suffled


cartas = [2, 6, 4, 5]

print(suffle(cartas))

# Complexidade O(n)
