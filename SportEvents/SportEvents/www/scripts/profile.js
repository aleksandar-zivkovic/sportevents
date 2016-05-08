$.ajax({
    type: 'GET',
    url: 'http://vasic.ddns.net/users/getuserbyusername',
    data: "username=" + getCookie('user'),
    success: parseUser,
    error: function (xhr, status, error) {
        swal({
            title: "Error!",
            text: error,
            timer: 5000,
            type: "error"
        }, function () {
            window.history.back();
        });
    }
});

function parseUser(data) {
    user = JSON.parse(data);

    $("#usernameInput").val(user.username);
    $("#emailInput").val(user.email);

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function onSuccess(position) {
    $("#latitudeInput").val(position.coords.latitude);
    $("#longitudeInput").val(position.coords.longitude);
}

function onError(error) {
    //alert('code: ' + error.code + '\n' +
    //        'message: ' + error.message + '\n');

    swal({
        title: "Error!",
        text: "Error while loading location. Error code: " + error.code + "\nMessage: " + error.message,
        timer: 5000,
        type: "error"
    });
}