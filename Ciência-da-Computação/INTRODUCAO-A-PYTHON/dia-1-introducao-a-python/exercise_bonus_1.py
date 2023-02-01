def minimum_with_min(numbers):
    return min(numbers)


print(minimum_with_min([5, 9, 3, 19, 70, 8, 100, 2, 35, 27]))


def minimum_with_for_in(numbers):
    min = numbers[0]
    for number in numbers:
        if number < min:
            min = number
    return min


print(minimum_with_for_in([5, 9, 3, 19, 70, 8, 100, 2, 35, 27]))
