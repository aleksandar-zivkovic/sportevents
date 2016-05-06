var title = document.getElementById('action-bar-title-text');
title.className += " action-bar-title-small";

$.ajax({
    type: 'GET',
    url: 'http://vasic.ddns.net/users/getuserbyid',
    data: "id=" + getParameterByName("id", window.location),
    success: parseUser,
    error: function (xhr, status, error) {
        alert(error.message);
    }
});

function parseUser(data) {
    //parse JSON data
    event = JSON.parse(data);

    setTitle(event.name);
}