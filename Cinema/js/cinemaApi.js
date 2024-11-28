function getCinemas(lat, lon, distance, callback) {
    const apiUrl = `https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?where=within_distance(geolocalisation%2C%20geom'POINT(${lon}%20${lat})%27%2C%20${distance}km)&limit=20`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const cinemas = data.records.map(record => ({
                name: record.fields.nom,
                address: record.fields.adresse,
                distance: calculateDistance(lat, lon, record.fields.geolocalisation.lat, record.fields.geolocalisation.lon)
            }));
            callback(cinemas);
        })
        .catch(err => alert('Erreur lors de la récupération des cinémas'));
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance en km
}
