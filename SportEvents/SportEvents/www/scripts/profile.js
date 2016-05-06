
$.ajax({
    type: 'GET',
    url: 'http://vasic.ddns.net/users/getuserbyusername',
    data: "username=" + getCookie('user'),
    success: parseUser,
    error: function (xhr, status, error) {
        swal("Error!", error , "error");
    }
});

function parseUser(data) {
    //parse JSON data
    user = JSON.parse(data);

    //setTitle(user.username);

    $("#usernameInput").val(user.username);
    $("#emailInput").val(user.email);   
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);

// onSuccess Geolocation
//
function onSuccess(position) {
    //var element = document.getElementById('geolocationInput');
    //element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
    //                    'Longitude: ' + position.coords.longitude + '<br />' +
    //                    'Altitude: ' + position.coords.altitude + '<br />' +
    //                    'Accuracy: ' + position.coords.accuracy + '<br />' +
    //                    'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
    //                    'Heading: ' + position.coords.heading + '<br />' +
    //                    'Speed: ' + position.coords.speed + '<br />' +
    //                    'Timestamp: ' + position.timestamp + '<br />';


    $("#latitudeInput").val(position.coords.latitude);
    $("#longitudeInput").val(position.coords.longitude);
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
}