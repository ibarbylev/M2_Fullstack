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


async def main():
    start_server = await websockets.serve(handler, "localhost", 8765)
    print("WS Сервер Запущен по адресу: ws://localhost:8765")

    # Сервер работает до тех пор, пока не завершится
    await start_server.wait_closed()

asyncio.run(main())
print("Сервер Остановлен")
