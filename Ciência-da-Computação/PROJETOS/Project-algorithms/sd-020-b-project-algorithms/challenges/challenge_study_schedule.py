def study_schedule(permanence_period, target_time):
    how_many_target_appeard = 0
    if target_time is None:
        return None
    for enter_period, exit_period in permanence_period:
        if type(enter_period) != int or type(exit_period) != int:
            return None
        if enter_period <= target_time <= exit_period:
            how_many_target_appeard += 1
    return how_many_target_appeard
