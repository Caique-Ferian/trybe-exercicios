def sum_all_numbers(n: int) -> int:
    total = 0
    for number in range(n + 1):
        total += number
    return total


print(sum_all_numbers(5))
