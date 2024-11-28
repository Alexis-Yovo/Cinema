function getUserLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            callback(position.coords.latitude, position.coords.longitude);
        }, function() {
            alert('Erreur de géolocalisation');
        });
    } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
}

document.getElementById('geolocate-btn').addEventListener('click', function() {
    getUserLocation(function(lat, lon) {
        getAddressFromCoordinates(lat, lon);
    });
});
