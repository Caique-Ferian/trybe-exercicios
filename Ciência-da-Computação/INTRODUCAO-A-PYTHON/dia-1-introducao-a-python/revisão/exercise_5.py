def paint_cost(wall_size: int) -> tuple:
    PAINT_PRICE = 80
    CAN_VOLUME = 18
    paint_volume = wall_size / 3
    total_can = paint_volume // CAN_VOLUME
    if paint_volume % CAN_VOLUME:
        total_can += 1
    return (total_can, total_can * PAINT_PRICE)


print(paint_cost(90))
