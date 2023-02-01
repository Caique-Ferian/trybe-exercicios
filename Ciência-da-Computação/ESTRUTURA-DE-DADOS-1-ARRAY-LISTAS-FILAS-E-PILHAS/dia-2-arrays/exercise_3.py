def pair_itens(number_list):
    how_much_pairs = 0

    for i in range(len(number_list)):
        for j in range(i + 1, len(number_list)):
            if number_list[i] == number_list[j]:
                how_much_pairs += 1
    return how_much_pairs


print(pair_itens([1, 3, 1, 1, 2, 3]))

# Complexidade O(n²).
