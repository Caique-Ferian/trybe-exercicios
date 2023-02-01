def paints_cost(wall_size):
    PAINT_COST = 80
    CAN_VOLUME = 18
    paint_volume = wall_size / 3
    total_can = paint_volume // CAN_VOLUME
    if paint_volume % CAN_VOLUME:
        total_can += 1
    return (total_can, PAINT_COST * total_can)


print(paints_cost(90))
