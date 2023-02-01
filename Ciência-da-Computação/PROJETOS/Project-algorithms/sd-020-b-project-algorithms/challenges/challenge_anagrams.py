def quick_sort(all_letters, start, end):
    if start < end:
        p = partition(all_letters, start, end)
        quick_sort(all_letters, start, p - 1)
        quick_sort(all_letters, p + 1, end)


def partition(string, start, end):
    pivot = string[end]
    delimiter = start - 1

    for index in range(start, end):
        if string[index] <= pivot:
            delimiter = delimiter + 1
            string[index], string[delimiter] = (
                string[delimiter],
                string[index],
            )

    string[delimiter + 1], string[end] = string[end], string[delimiter + 1]

    return delimiter + 1


def separete_all_letters(string):
    all_letters = []
    for letter in string:
        all_letters.append(letter)
    return all_letters


def is_anagram(first_string, second_string):
    if not first_string and not second_string:
        return ("", "", False)
    first_word, second_word = (
        separete_all_letters(first_string.lower()),
        separete_all_letters(second_string.lower()),
    )
    quick_sort(first_word, 0, len(first_word) - 1)
    quick_sort(second_word, 0, len(second_word) - 1)
    return (
        "".join(first_word),
        "".join(second_word),
        first_word == second_word,
    )
