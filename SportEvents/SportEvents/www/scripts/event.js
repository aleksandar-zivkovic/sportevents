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
    //$("#latitudeInput").val(event.latitude);
    //$("#longitudeInput").val(event.longitude);

    ReverseGeocode(event.latitude, event.longitude)

    // set event marker on map
    var coords = new google.maps.LatLng(event.latitude, event.longitude);

    var mapOptions = {
        zoom: 15,
        center: coords,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //create the map, and place it in the HTML map div
    map = new google.maps.Map(
    document.getElementById("map"), mapOptions
    );

    //place the initial marker
    var marker = new google.maps.Marker({
        position: coords,
        map: map,
        title: "Event location!"
    });
}

// ---------------------------------------------------------
//                                                  MAP PART
// ---------------------------------------------------------

if (navigator.geolocation) {
    //navigator.geolocation.getCurrentPosition(reverseGeocodeCurrentLocation);
}
else {
    alert("Geolocation API not supported.");
}

//function reverseGeocodeCurrentLocation(position) {
//    var latitude = position.coords.latitude;
//    var longitude = position.coords.longitude;
//    var coords = new google.maps.LatLng(latitude, longitude);

//    ReverseGeocode(latitude, longitude);
//}