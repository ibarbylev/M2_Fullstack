    fetch('/api/get-data')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.images-container-body');
            if (Array.isArray(data) && data.length > 0) { container.innerHTML = ""; }
            const body = document.createElement('div');
            body.className = 'images-container-body';

            data.forEach(img => {
                body.innerHTML += `
                <div class="images-container-body-line">
                    <div class="images-container-body-item column1">
                        <img src="/static/img/some-img.svg" alt="some-img" width="16" height="16">
                        <span>${img.name}</span>
                    </div>
                    <div class="images-container-body-item column2">${img.url}</div>
                    <div class="images-container-body-item"><div class="column3">${img.size}</div></div>
                    <div class="images-container-body-item column4">${img.uploaded_at}</div>
                    <div class="images-container-body-item column5">${img.type}</div>
                    <div class="images-container-body-item column6">
                        <img src="/static/img/delete.svg" alt="delete" width="30" height="30">
                    </div>
                </div>`;
            });

            container.appendChild(body);
        });