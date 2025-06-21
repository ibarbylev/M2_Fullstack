import time
import requests

while True:
    try:
        response = requests.get("http://api-container:5000/")
        # response = requests.get("http://api:5000/")
        print("Ответ от API:", response.text)
    except Exception as e:
        print("Ошибка при подключении к API:", e)
    time.sleep(5)
