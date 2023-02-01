from pymongo import MongoClient

category = input('Selecione uma categoria: ')
with MongoClient() as client:
  db = client.library
  for book in db.books.find({"categories": category}, {'_id':0,'title':1}):
    print(book)