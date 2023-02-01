def is_palindrome_iterative(word):
    if not word:
        return False
    start = 0
    last = len(word) - 1
    reverse_word = ""
    while start <= last:
        reverse_word += word[last]
        last -= 1
    if reverse_word == word:
        return True
    return False
