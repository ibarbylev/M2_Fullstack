import os
from http.server import HTTPServer, SimpleHTTPRequestHandler
# pip install requests-toolbelt Pillow
from requests_toolbelt.multipart import decoder
from PIL import Image

UPLOAD_DIR = 'uploads'
os.makedirs(UPLOAD_DIR, exist_ok=True)

class UploadHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        content_type = self.headers.get('Content-Type', '')
        # 'multipart/form-data; boundary=----geckoformboundary8b54b49d519f16e9f809e22481130486'
        content_length = int(self.headers.get('Content-Length', 0))

        if not content_type.startswith('multipart/form-data'):
            self.send_response(400)
            self.end_headers()  # заканчивает добавление заголовов (в нашем случае - пустой заголовок)
            self.wfile.write(b"Error: Content-Type must be multipart/form-data")
            return

        if content_length <= 0:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"Error: Content-Length must be greater than 0")
            return

        body = self.rfile.read(content_length)

        try:
            multipart_data = decoder.MultipartDecoder(body, content_type)
        except Exception as e:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(f"Error parsing multipart data: {str(e)}".encode('utf-8'))
            return

        saved = []
        errors = []

        for part in multipart_data.parts:
            disposition = part.headers.get(b'Content-Disposition', b'').decode('utf-8')
            if 'filename' not in disposition:
                continue

            # Извлекаем имя файла из Content-Disposition
            filename = disposition.split('filename="')[1].split('"')[0]
            filename = os.path.basename(filename)
            filepath = os.path.join(UPLOAD_DIR, filename)

            # Сохраняем файл
            try:
                with open(filepath, 'wb') as f:
                    f.write(part.content)
            except Exception as e:
                errors.append(f"{filename}: failed to save file ({str(e)})")
                continue

            # Проверяем, является ли файл изображением
            try:
                with Image.open(filepath) as img:
                    img.verify()
                with Image.open(filepath) as img:
                    format = img.format
                    size = img.size
                saved.append(f"{filename} (format: {format}, size: {size})")
            except Exception as e:
                print(f'{e.__class__.__name__}: {e}')
                os.remove(filepath)
                errors.append(f"{filename}: not a valid image, removed")

        self.send_response(200)
        self.end_headers()

        response = ""
        if saved:
            response += "Uploaded and verified images:\n" + "\n".join(saved) + "\n"
        if errors:
            response += "Errors:\n" + "\n".join(errors)

        self.wfile.write(response.encode('utf-8'))


if __name__ == '__main__':
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, UploadHandler)
    print("Server started on http://localhost:8000")
    httpd.serve_forever()