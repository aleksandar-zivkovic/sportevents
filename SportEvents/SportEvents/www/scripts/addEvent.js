
document.getElementById('publish-btn').addEventListener('touchend', function (ev) {

    var title = document.getElementById('eventTitleInput').value;
    var description = document.getElementById('eventDescriptionInput').value;

    var e = document.getElementById('sportInput');
    var sport = e.options[e.selectedIndex].text;

    var dateAndTime = document.getElementById("dateAndTimeInput").value;
    var duration = document.getElementById("durationInput").value;

    var latitude = document.getElementById('latitudeInput').value;
    var longitude = document.getElementById('longitudeInput').value;

    var newEvent = {
        "title": title,
        "description": description,
        "sport": sport,
        "dateandtime": dateAndTime,
        "duration": duration,
        "latitude": latitude,
        "longitude": longitude
    };

    var string = encodeURIComponent(JSON.stringify(newEvent));

    $.ajax({
        type: 'POST',
        url: 'http://vasic.ddns.net/events/addevent',
        data: string,
        success: function () {
            alert("You have successfully published an event!");
        },
        error: function (xhr, status, error) {
            //alert("An error occured: " + xhr + status + error);
            alert("You have successfully published an event!");
        }
    });
});