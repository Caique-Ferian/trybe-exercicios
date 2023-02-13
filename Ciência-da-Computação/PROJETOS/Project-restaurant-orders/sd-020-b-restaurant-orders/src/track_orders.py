from collections import Counter


class TrackOrders:
    # aqui deve expor a quantidade de estoque
    def __init__(self):
        self.orders = {}
        self.foods = set()
        self.workdays = set()
        self.index = 1

    def __len__(self):
        return len(self.orders)

    def add_new_order(self, customer, order, day):
        self.orders[self.index] = [customer, order, day]
        self.foods.add(order)
        self.workdays.add(day)
        self.index += 1

    def get_most_ordered_dish_per_customer(self, customer):
        foods_ordered_by_customer = []
        for order in self.orders.values():
            if order[0] == customer:
                foods_ordered_by_customer.append(order[1])
        counter = Counter(foods_ordered_by_customer)
        return max(foods_ordered_by_customer, key=counter.get)

    def get_never_ordered_per_customer(self, customer):
        foods_ordered_by_customer = set()
        for order in self.orders.values():
            if order[0] == customer:
                foods_ordered_by_customer.add(order[1])
        return self.foods.difference(foods_ordered_by_customer)

    def get_days_never_visited_per_customer(self, customer):
        days_customer_went_to_the_restaurant = set()
        for order in self.orders.values():
            if order[0] == customer:
                days_customer_went_to_the_restaurant.add(order[2])
        return self.workdays.difference(days_customer_went_to_the_restaurant)

    def get_busiest_day(self):
        all_workdays = []
        for order in self.orders.values():
            all_workdays.append(order[2])
        counter = Counter(all_workdays)
        return max(all_workdays, key=counter.get)

    def get_least_busy_day(self):
        all_workdays = []
        for order in self.orders.values():
            all_workdays.append(order[2])
        counter = Counter(all_workdays)
        return min(all_workdays, key=counter.get)
