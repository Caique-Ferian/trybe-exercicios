double = {i:i*2 for i in range(3,21)}

# print(double)

for key in double.keys():
  if key % 2 != 0:
    double[key] = key*3

print(double)
