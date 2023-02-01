def is_palindrome_recursive(word, low_index, high_index):
    if not word:
        return False
    elif (
        len(word) == 1
        or (
            low_index + 1 == high_index and word[low_index] == word[high_index]
        )
        or low_index == high_index
    ):
        return True
    elif (word[low_index] == word[high_index]) and is_palindrome_recursive(
        word, low_index + 1, high_index - 1
    ):
        return True
    return False
