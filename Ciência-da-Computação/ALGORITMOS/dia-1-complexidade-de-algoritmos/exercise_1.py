def contains_duplicate(numbers):
    numbers.sort()
    previous_number = "not a number"
    for number in numbers:
        if previous_number == number:
            return True
        previous_number = number

    return False


# Como o código realiza a ordenação primeiro do array, trata-se de um algoritmo
# O(log n) no melhor dos casos caso seja o primeiro elemento, no seu caso
# médio caso trata-se de um algoritmo O(n log n), já no seu pior caso seria
# um algoritmo linear O(n). Resumindo a complexidade desse algoritmo seria
# O(n * log n + n) que simplificando fica O(n log n)
