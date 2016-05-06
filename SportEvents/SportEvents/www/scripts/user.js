var title = document.getElementById('action-bar-title-text');
title.className += " action-bar-title-small";

$.ajax({
    type: 'GET',
    url: 'http://vasic.ddns.net/users/getuserbyid',
    data: "id=" + getParameterByName("id", window.location),
    success: parseUser,
    error: function (xhr, status, error) {
        swal("Error!", error, "error");
    }
});

function parseUser(data) {
    //parse JSON data
    user = JSON.parse(data);

    setTitle(user.username);

    $("#usernameInput").val(user.username);
    $("#emailInput").val(user.email);
}