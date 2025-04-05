import asyncio
import websockets


async def connect():
    uri = "ws://localhost:8765"
    async with websockets.connect(uri) as websocket:
        print("Подключено к серверу")

        await websocket.send("Привет, сервер!")
        response = await websocket.recv()
        print(f"Ответ от сервера: {response}")

        # Сообщаем серверу, что отключаемся
        await websocket.send("CLOSE")

        await asyncio.sleep(2)  # Ждём ещё 2 секунды

    print("Клиент отключился")

asyncio.run(connect())