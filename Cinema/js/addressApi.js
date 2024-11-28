function getAddressFromCoordinates(lat, lon) {
    const apiUrl = `https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}&format=json`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const address = data.features[0].properties.label;
            document.getElementById('address-search').value = address;
        })
        .catch(err => alert('Erreur lors de la récupération de l\'adresse'));
}
