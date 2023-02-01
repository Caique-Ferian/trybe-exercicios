import json
import csv


def count_books_by_categories_and_calculate_percentage(books):
    categories = {}
    for books in data:
        for book_category in books["categories"]:
            if book_category not in categories:
                categories[book_category] = 0
            categories[book_category] += 1
    return [
        [category, num_books / len(books)]
        for category, num_books in categories.items()
    ]


if __name__ == "__main__":
    with open("book.json", "r") as file:
        data = json.load(file)
        books_categories_list_with_percentege = (
            count_books_by_categories_and_calculate_percentage(data)
        )
    header = ["categoria", "porcentagem"]
    with open("report.csv", "w") as file:
        writer = csv.writer(file)
        writer.writerow(header)
        writer.writerows(books_categories_list_with_percentege)
    # print(books_categories_list_with_percentege)
