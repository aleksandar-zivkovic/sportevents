var title = document.getElementById('action-bar-title-text');
title.className += " action-bar-title-small";

$.ajax({
    type: 'GET',
    url: 'http://vasic.ddns.net/events/geteventbyid',
    data: "id=" + getParameterByName("id", window.location),
    success: parseEvent,
    error: function (xhr, status, error) {
        swal("Error!", error, "error");
    }
});

function parseEvent(data) {
    //parse JSON data
    event = JSON.parse(data);

    setTitle(event.title);

    $("#sportInput").val(event.sport);
    $("#eventTitleInput").val(event.title);
    $("#eventDescriptionInput").val(event.description);
    $("#dateAndTimeInput").val(event.dateandtime);
    $("#durationInput").val(event.duration);
    $("#latitudeInput").val(event.latitude);
    $("#longitudeInput").val(event.longitude);
}