""" Программа сервера для получения приветствия от клиента и отправки ответа
AF_INET - используются адреса IPv4 (255.255.255.255)
SOCK_STREAM - используется протокол TCP/IP

Иногда, серверный сокет блокирует попытку отключения на время от 1-ой до 5 минут (зависит от ОС)
Если нет времени ждать - раскомитьте эту команду:
serv_sock.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
и добавьте в строку импорта
from socket import socket, AF_INET, SOCK_STREAM, SOL_SOCKET, SO_REUSEADDR
"""

from socket import socket, AF_INET, SOCK_STREAM

with socket(AF_INET, SOCK_STREAM) as serv_sock:
    # serv_sock.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1) - как правило, это условие избыточно!
    serv_sock.bind(('', 5000))
    serv_sock.listen()

    while True:
        client_sock, addr = serv_sock.accept()
        request = client_sock.recv(4096)
        print('request клиента:', request)
        print(f"Сообщение: {request.decode('utf-8')} было отправлено клиентом: {addr})")
        response = 'Привет, клиент'
        client_sock.send(response.encode('utf-8'))
        client_sock.close()  # Закрытие соединения с клиентом
        
        
        
        
        
                # content = 'Привет, клиент'.encode('utf-8')
                # response = (
                #     b"HTTP/1.1 200 OK\r\n"
                #     b"Content-Type: text/html; charset=utf-8\r\n"
                #     b"Content-Length: " + str(len(content)).encode() + b"\r\n"
                #     b"\r\n" +
                #     content
                # )

                #  client_sock.send(response)
