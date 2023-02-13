count_char = {}

for char in "bbbbaaaacccaaaaaaddddddddccccccc":
  if char not in count_char:
    count_char[char] = 1
  else:
    count_char[char] += 1

print(count_char)