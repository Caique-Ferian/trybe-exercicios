def students_in_library_instante(enter_time, exit_time, search_time):
    return sum(
        enter_time < search_time < exit_time
        for enter_time, exit_time in zip(enter_time, exit_time)
    )


print(students_in_library_instante([1, 2, 3], [3, 2, 7], 4))

# Complexidade  O(n)
