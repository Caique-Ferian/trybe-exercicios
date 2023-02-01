def minimum_with_min(numbers: list[int]) -> int:
    return min(numbers)


print(minimum_with_min([5, 9, 3, 19, 70, 8, 100, 2, 35, 27]))


def minimum_with_for_in(numbers: list[int]) -> int:
    minimum = 100000
    for number in numbers:
        if number < minimum:
            minimum = number
    return minimum


print(minimum_with_for_in([5, 9, 3, 19, 70, 8, 100, 2, 35, 27]))
