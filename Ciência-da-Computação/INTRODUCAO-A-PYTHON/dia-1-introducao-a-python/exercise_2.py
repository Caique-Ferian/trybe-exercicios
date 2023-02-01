def average(numbers):
    total = 0
    for number in numbers:
        total += number
    return total / len(numbers)


print("A média é: ", average([1, 2, 3, 4, 5]))
