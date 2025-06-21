// 1. Считаем параметр "page" из текущего URL
const urlParams = new URLSearchParams(window.location.search);
const page = parseInt(urlParams.get('page')) || 1;


// 2. Загружаем данные с нужной страницы
fetch(`/api/images?page=${page}`)
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('.images-container');
        const body = document.createElement('div');
        body.className = 'images-container-body';

        // 3. Отрисовываем записи
        data.forEach(img => {
            body.innerHTML += `
            <div class="images-container-body-line">
                <div class="images-container-body-item column1">
                    <img src="./img/some-img.svg" width="16" height="16">
                    <span>${img.name}</span>
                </div>
                <div class="images-container-body-item column2">${img.url}</div>
                <div class="images-container-body-item column3">${img.size}</div>
                <div class="images-container-body-item column4">${img.uploaded_at}</div>
                <div class="images-container-body-item column5">${img.type}</div>
                <div class="images-container-body-item column6">
                    <img src="./img/delete.svg" width="30" height="30">
                </div>
            </div>`;
        });

        container.appendChild(body);

        // 4. Кнопки пагинации
        const pagination = document.createElement('div');
        pagination.className = 'd-flex justify-content-center my-4 gap-3';

        if (page > 1) {
            const prev = document.createElement('a');
            prev.href = `?page=${page - 1}`;
            prev.className = 'btn btn-primary';
            prev.textContent = 'Previous Page';
            pagination.appendChild(prev);
        }

        const next = document.createElement('a');
        next.href = `?page=${page + 1}`;
        next.className = 'btn btn-primary';
        next.textContent = 'Next Page';
        pagination.appendChild(next);

        container.appendChild(pagination);
    });

