def verify_software_status_ok(list_status):
    max_time = 0
    is_ok_status = 0
    for item in list_status:
        if item == 1:
            is_ok_status += 1
        else:
            is_ok_status = 0
    if is_ok_status > max_time:
        max_time = is_ok_status
    return max_time


print(
    "O servidor ficou sem instabilidade por:",
    verify_software_status_ok([0, 1, 1, 1, 0, 0, 1, 1]),
    "horas",
)

# Complexidade O(n)
