def find_duplicate(nums):
    nums.sort()
    if len(nums) < 2:
        return False
    for index in range(len(nums) - 1):
        if type(nums[index]) != int or nums[index] < 0:
            return False
        if nums[index] == nums[index + 1]:
            return nums[index]
    return False
