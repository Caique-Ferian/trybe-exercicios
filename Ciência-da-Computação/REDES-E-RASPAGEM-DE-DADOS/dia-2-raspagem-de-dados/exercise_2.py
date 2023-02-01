import requests

response = requests.get('https://api.github.com/users')


for user in response.json():
  print('username: ', user['login'])
  print('url: ', user['url'])
