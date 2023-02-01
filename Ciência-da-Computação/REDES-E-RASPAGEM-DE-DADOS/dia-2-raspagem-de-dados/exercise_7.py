from pymongo import MongoClient

with MongoClient() as client:
  db = client.library
  pipelines = [
    {'$match': {'status': 'PUBLISH'}},
    {'$unwind': '$categories'},
    {'$group': {'_id':'$categories','count':{'$sum': 1}}},
    {'$sort': {'count': -1}}
  ]
  for book in db.books.aggregate(pipelines):
    print(book['_id'],book['count'],sep=' ')
