import asyncio
import websockets  # pip install websockets


async def handler(websocket, path):
    client_ip, client_port = websocket.remote_address  # Получаем IP и порт клиента
    print(f"Клиент {client_port} подключился")

    try:
        async for message in websocket:
            if message == "CLOSE":
                print(f"Клиент {client_port} сообщил об отключении")
                break

            print(f"Получено от {client_port}: {message}")
            await websocket.send(f"Эхо: {message}")

    except websockets.exceptions.ConnectionClosed:
        print(f"Клиент {client_port} отключился через ConnectionClosed")
    except asyncio.CancelledError:
        print(f"Клиент {client_port} отключился через CancelledError")
    except Exception as e:
        print(f"Ошибка с клиентом {client_port}: {e}")
    finally:
        print(f"Соединение с клиентом {client_port} закрыто")


start_server = websockets.serve(handler, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
print("WS Сервер Запущен по адресу: ws://localhost:8765")
asyncio.get_event_loop().run_forever()

print("Сервер Остановлен")
