import asyncio
import websockets


async def connect():
    try:
        async with websockets.connect("ws://localhost:8765") as websocket:
            response = await websocket.recv()
            print(response)
            await websocket.send("Привет, сервер!")
            response = await websocket.recv()
            print(f"Ответ от сервера: {response}")

    except websockets.exceptions.ConnectionClosedError as e:
        print(f"Ошибка соединения: {e}")
    except Exception as e:
        print(f"Произошла неожиданная ошибка: {e}")

asyncio.run(connect())
