import csv
from collections import Counter


class Orders:
    def __init__(self, csv_content):
        self.content = csv_content
        self.maria = []
        self.arnaldo = []
        self.joao = []
        self.all_foods = set()
        self.restaraunt_workdays = set()

    def separete_content(self):
        for line in self.content:
            name, food, days = line
            self.all_foods.add(food)
            self.restaraunt_workdays.add(days)
            if name == "maria":
                self.maria.append(line)
            elif name == "arnaldo":
                self.arnaldo.append(line)
            elif name == "joao":
                self.joao.append(line)

    def maria_most_ordered_food(self):
        all_orders = []
        for maria_order in self.maria:
            _, food, _ = maria_order
            all_orders.append(food)
        counter = Counter(all_orders)
        return max(all_orders, key=counter.get)

    def how_many_times_arnaldo_ordered_hamburguer(self):
        all_orders = {}
        for arnaldo_order in self.arnaldo:
            _, food, _ = arnaldo_order
            if food not in all_orders:
                all_orders[food] = 1
            else:
                all_orders[food] += 1
        return str(all_orders["hamburguer"])

    def what_food_joao_did_not_order(self):
        set_foods_ordered = set()
        for joao_order in self.joao:
            _, food, _ = joao_order
            set_foods_ordered.add(food)

        return str(self.all_foods.difference(set_foods_ordered))

    def what_days_joao_did_not_went_to_restaurant(self):
        set_days = set()
        for joao_order in self.joao:
            _, _, days = joao_order
            set_days.add(days)

        return str(self.restaraunt_workdays.difference(set_days))


def analyze_log(path_to_file):
    try:
        with open(path_to_file, "r") as f:
            content = csv.reader(f)
            orders = Orders(content)
            orders.separete_content()
            with open("data/mkt_campaign.txt", "w") as f:
                answer_one = orders.maria_most_ordered_food()
                answer_two = orders.how_many_times_arnaldo_ordered_hamburguer()
                answer_three = orders.what_food_joao_did_not_order()
                answer_four = (
                    orders.what_days_joao_did_not_went_to_restaurant()
                )
                f.write(
                    answer_one
                    + "\n"
                    + answer_two
                    + "\n"
                    + answer_three
                    + "\n"
                    + answer_four
                )
    except FileNotFoundError:
        if not path_to_file.endswith(".csv"):
            raise FileNotFoundError(f"Extensão inválida.{path_to_file}")
        else:
            raise FileNotFoundError(f"Arquivo inexistente.{path_to_file}")
