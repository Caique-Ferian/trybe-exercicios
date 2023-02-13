class Employee:
    def __init__(self, id_num, name):
        self.id_num = id_num
        self.name = name
  
class HashMap:
  def __init__(self):
      self._buckets = [[] for i in range(10)]

  def get_address(self, id_num):
      return id_num % 10
  
  def insert(self, employee):
      address = self.get_address(employee.id_num)
      self._buckets[address].append(employee)
  
  def get_value(self, id_num):
        address = self.get_address(id_num)
        for item in self._buckets[address]:
            if item.id_num == id_num:
                return item.name
        return None

  def has(self, id_num):
      address = self.get_address(id_num)
      return self._buckets[address] is not None
  
  def update_value(self, id_num, new_name):
    address = self.get_address(id_num)
    for item in self._buckets[address]:
      if item.id_num == id_num:
        item.name = new_name

  

employees = [Employee(14,'name1'),Employee(23,'name2'),Employee(10,'name3'),Employee(9,'name4')]

hash_map = HashMap()

for employee in employees:
  hash_map.insert(employee)

print('nome pos 23:',hash_map.get_value(23))
print('nome pos 10:',hash_map.get_value(10))
hash_map.update_value(10,'name30')
print('nome pos 10 atualizado:',hash_map.get_value(10))
