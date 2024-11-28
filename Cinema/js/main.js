document.getElementById('cinema-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const address = document.getElementById('address-search').value;
    const distance = document.getElementById('distance-range').value;

    getCoordinatesFromAddress(address, function(lat, lon) {
        getCinemas(lat, lon, distance, function(cinemas) {
            displayCinemas(cinemas);
            displayMap(lat, lon, cinemas);
        });
    });
});

function getCoordinatesFromAddress(address, callback) {
    const apiUrl = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}&limit=1&format=json`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const lat = data.features[0].geometry.coordinates[1];
            const lon = data.features[0].geometry.coordinates[0];
            callback(lat, lon);
        })
        .catch(err => alert('Erreur lors de la récupération des coordonnées'));
}

function displayCinemas(cinemas) {
    const list = document.getElementById('cinema-list');
    list.innerHTML = '';

    cinemas.forEach(cinema => {
        const li = document.createElement('li');
        li.textContent = `${cinema.name} - ${cinema.address} (Distance: ${cinema.distance.toFixed(2)} km)`;
        list.appendChild(li);
    });
}

function displayMap(lat, lon, cinemas) {
    const map = L.map('map').setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    cinemas.forEach(cinema => {
        const cinemaLatLon = [cinema.lat, cinema.lon];
        L.marker(cinemaLatLon).addTo(map)
            .bindPopup(`<b>${cinema.name}</b><br>${cinema.address}`);
    });
}
