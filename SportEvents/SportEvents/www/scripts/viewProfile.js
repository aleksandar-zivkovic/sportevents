// onSuccess Geolocation
//
function onSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'My current location: ' + '<br />' + '<br />' +
                        'Latitude: ' + position.coords.latitude + '<br />' +
                        'Longitude: ' + position.coords.longitude + '<br />' +
                        'Altitude: ' + position.coords.altitude + '<br />' +
                        'Accuracy: ' + position.coords.accuracy + '<br />' +
                        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
                        'Heading: ' + position.coords.heading + '<br />' +
                        'Speed: ' + position.coords.speed + '<br />' +
                        'Timestamp: ' + position.timestamp + '<br />';
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
}

document.getElementById('geolocation').innerHTML = navigator.geolocation.getCurrentPosition(onSuccess, onError);