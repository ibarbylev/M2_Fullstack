import socket

HOST = ''       # слушать на всех интерфейсах
PORT = 8000     # порт сервера

def handle_request(conn):
    request = conn.recv(1024).decode('utf-8')
    print("Request:")
    print(request)

    try:
        with open("index.html", "rb") as f:
            content = f.read()
        response = b"""\
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: """ + str(len(content)).encode() + b"\r\n\r\n" + content
    except FileNotFoundError:
        content = b"<h1>404 Not Found</h1>"
        response = b"""\
HTTP/1.1 404 Not Found
Content-Type: text/html; charset=utf-8
Content-Length: """ + str(len(content)).encode() + b"\r\n\r\n" + content

    conn.sendall(response)
    conn.close()

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server:
    server.bind((HOST, PORT))
    server.listen(1)
    print(f"Serving on port {PORT}...")

    while True:
        conn, addr = server.accept()
        handle_request(conn)
