class InventoryControl:
    INGREDIENTS = {
        'hamburguer': ['pao', 'carne', 'queijo'],
        'pizza': ['massa', 'queijo', 'molho'],
        'misto-quente': ['pao', 'queijo', 'presunto'],
        'coxinha': ['massa', 'frango'],
    }
    MINIMUM_INVENTORY = {
        'pao': 50,
        'carne': 50,
        'queijo': 100,
        'molho': 50,
        'presunto': 50,
        'massa': 50,
        'frango': 50,
    }

    def __init__(self):
        self.orders = {}
        self.index = 1
        self.ingredients_to_buy = {
            'pao': 0,
            'carne': 0,
            'queijo': 0,
            'molho': 0,
            'presunto': 0,
            'massa': 0,
            'frango': 0,
        }
        self.available_ingredients = InventoryControl.MINIMUM_INVENTORY.copy()

    def add_new_order(self, customer, order, day):
        self.orders[self.index] = [customer, order, day]
        self.index += 1
        for ingredient in InventoryControl.INGREDIENTS[order]:
            if self.available_ingredients[ingredient] > 0:
                self.ingredients_to_buy[ingredient] += 1
                self.available_ingredients[ingredient] -= 1
            else:
                return False

    def get_available_dishes(self):
        available_dishes = set()
        for food, i in InventoryControl.INGREDIENTS.items():
            if (food != 'coxinha' and self.available_ingredients[i[0]] > 0
                    and self.available_ingredients[i[1]] > 0
                    and self.available_ingredients[i[2]] > 0):
                available_dishes.add(food)
            elif (food == 'coxinha' and self.available_ingredients[i[0]] > 0
                    and self.available_ingredients[i[1]] > 0):
                available_dishes.add(food)
        return available_dishes

    def get_quantities_to_buy(self):
        return self.ingredients_to_buy
