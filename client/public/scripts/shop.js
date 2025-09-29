const renderShop = async () => {
    const requestedSlug = window.location.href.split('/').pop();

    const response = await fetch('/shops');
    const data = await response.json();

    const shopContent = document.getElementById('shop-content');
    const shop = data.find(s => s.slug === requestedSlug);

    if (shop) {
        document.getElementById('image').src = shop.image;
        document.getElementById('image').alt = shop.name;

        document.getElementById('name').textContent = shop.name;
        document.getElementById('locations').textContent = `Locations: ${shop.locations}`;

        const rec = document.getElementById('rec');
        rec.textContent = `My Go-To: ${shop.rec}`;

        const website = document.getElementById('website');
        website.innerHTML = `Website: <a href="${shop.website}" target="_blank">${shop.website}</a>`;

        document.title = `Sip Guide - ${shop.name}`;
    } else {
        window.location.href = '/404.html';
    }
};

renderShop();
