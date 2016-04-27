var title = document.getElementById('action-bar-title-text');
title.className += " action-bar-title-small";

$.ajax({
    type: 'GET',
    url: 'http://vasic.ddns.net/events/geteventbyid',
    data: "id=" + getParameterByName("id", window.location),
    success: parseEvent,
    error: function (xhr, status, error) {
        alert(error.message);
    }
});

function parseEvent(data) {
    //parse JSON data
    event = JSON.parse(data);

    setTitle(event.title);
}