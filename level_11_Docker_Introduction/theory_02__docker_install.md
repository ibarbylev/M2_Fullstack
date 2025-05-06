# Docker install

Вот краткое описание принципов установки Docker на Windows, macOS и Ubuntu:
## Windows:

- Устанавливается Docker Desktop через графический установщик (.exe).
- Использует WSL 2 (или Hyper-V) для запуска Linux-контейнеров.
- Включает Docker Engine, CLI, Compose и GUI.

Требует включения виртуализации и авторизации в Docker Hub для полного функционала.

## macOS:

- Устанавливается Docker Desktop через установочный пакет (.dmg).
- Использует встроенный гипервизор (HyperKit/QEMU) для Linux-контейнеров.
- Включает Docker Engine, CLI, Compose и GUI.

Простая установка с минимальной настройкой, требуется авторизация.

## Linux (Ubuntu):
[Мне больше нравится пошаговое руководство с сайта Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04#step-6-managing-docker-containers)

- Устанавливается Docker Engine через пакетный менеджер apt (обычно Docker Compose включён)
- Работает нативно на Linux-ядре, без виртуализации.

Опционально: 
 - Docker Compose (если не встал по умолчанию) 
 - [Docker Desktop для GUI.](https://docs.docker.com/desktop/setup/install/linux/ubuntu/)
 - [пакет pass (удобный и безопасный локальный менеджер ключей)](https://docs.docker.com/desktop/setup/sign-in/#credentials-management-for-linux-users)

## Резюме

Таким образом, нативная среда для Docker (Linux) не требует установки графической оболочки Docker Desktop для установки самого Docker Engine.  
В Linux'e Docker Engine - лишь дополнительное удобство.
Однако для Windows и macOS - это необходимость, поскольку эти ОС не адаптированы для работы с Docker'ом

Тем не менее, если в Windows предварительно установить WLS 2, а в macOS - пакет multipass, а также настроить виртуализацию,
та дальнейшая установка будет совпадать с установкой на Linux (Ubuntu), без обязательной установки Docker Engine.