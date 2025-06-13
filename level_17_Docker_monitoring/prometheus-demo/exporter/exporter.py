from prometheus_client import start_http_server, Gauge, Counter
import time, random

temperature = Gauge('room_temperature_celsius', 'Room temperature in Celsius')
my_custom_metric = Counter('my_custom_metric', 'A custom counter for testing')


def simulate():
    while True:
        temperature.set(random.uniform(18, 25))
        my_custom_metric.inc()  # Увеличиваем значение
        time.sleep(5)


if __name__ == '__main__':
    start_http_server(8000)  # http://localhost:8000/metrics
    simulate()
