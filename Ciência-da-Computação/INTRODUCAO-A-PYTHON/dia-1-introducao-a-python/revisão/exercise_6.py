def create_triangle(side_a: int, side_b: int, side_c: int) -> None:
    if side_a == side_b == side_c:
        print("Triângulo Equilátero")
    elif (
        side_a == side_b != side_c
        or side_a == side_c != side_b
        or side_b == side_c != side_a
    ):
        print("Triângulo Isósceles")
    else:
        print("Triângulo Escaleno")


create_triangle(3, 4, 5)
