""" Программа сервера для отправки приветствия сервера и получения ответа """

from socket import socket, AF_INET, SOCK_STREAM

with socket(AF_INET, SOCK_STREAM) as client_sock:
    client_sock.connect(('localhost', 5000))

    request = 'Привет, сервер'
    client_sock.send(request.encode('utf-8'))
    response = client_sock.recv(4096)
    print(response)
    print(f"Сообщение от сервера: {response.decode('utf-8')} длиной {len(response)} байт")
