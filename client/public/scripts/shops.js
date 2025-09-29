let shopData = [];

const renderShops = async () => {
    const response = await fetch('/shops');
    const data = await response.json();

    shopData = data; // store globally for filtering
    displayShops(shopData);
};

const displayShops = (shops) => {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // clear existing cards

    if (shops.length === 0) {
        mainContent.innerHTML = "<p>No shops found.</p>";
        return;
    }

    shops.forEach(shop => {
        const card = document.createElement('div');
        card.classList.add('card');

        const topContainer = document.createElement('div');
        topContainer.classList.add('top-container');
        topContainer.style.backgroundImage = `url(${shop.image})`;

        const bottomContainer = document.createElement('div');
        bottomContainer.classList.add('bottom-container');

        const name = document.createElement('h3');
        name.textContent = shop.name;
        bottomContainer.appendChild(name);

        const rec = document.createElement('p');
        rec.textContent = 'My Go-To: ' + shop.rec;
        bottomContainer.appendChild(rec);

        const link = document.createElement('a');
        link.textContent = 'Read More >';
        link.setAttribute('role', 'button');
        link.href = `/shops/${shop.slug}`;
        bottomContainer.appendChild(link);

        card.appendChild(topContainer);
        card.appendChild(bottomContainer);
        mainContent.appendChild(card);
    });
};

function filterShops() {
    const query = document.getElementById("searchBox").value.toLowerCase();

    const filteredShops = shopData.filter(shop => {
        return shop.name.toLowerCase().includes(query);
    });

    displayShops(filteredShops);
}

const requestedUrl = window.location.href.split('/').pop();

if (requestedUrl) {
    window.location.href = '../404.html';
} else {
    renderShops();
}