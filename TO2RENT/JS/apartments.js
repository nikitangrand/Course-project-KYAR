// JS/apartments.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('../Xml/apartments.xml')
        .then(response => response.text())
        .then(xmlData => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, "text/xml");
            const container = document.getElementById('apartmentsContainer');
            
            xmlDoc.querySelectorAll('apartment').forEach(item => {
                const card = document.createElement('div');
                card.className = 'appart--card';
                card.innerHTML = `
                    <h2>${item.querySelector('title').textContent}</h2>
                    <div class="card-content">
                        <img src="${item.querySelector('image').textContent}" class="card-image">
                        <div class="card-info">
                            <h3 class="price">${item.querySelector('price').textContent} ${item.querySelector('price').getAttribute('currency')}</h3>
                            <p class="description">${item.querySelector('description').textContent}</p>
                            <p>Комнат: ${item.querySelector('rooms').textContent}</p>
                            <p>Площадь: ${item.querySelector('area').textContent} м²</p>
                            <a href="${item.querySelector('detailLink').textContent}">
                                <button class="btn--description">Подробнее</button>
                            </a>
                        </div>
                    </div>
                    <button class="btn btn--appart">Забронировать</button>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Ошибка загрузки XML:', error));
});