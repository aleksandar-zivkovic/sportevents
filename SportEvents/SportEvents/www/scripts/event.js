var title = document.getElementById('action-bar-title-text');
title.className += " action-bar-title-small";

$.ajax({
    type: 'GET',
    url: 'http://vasic.ddns.net/events/geteventbyid',
    data: "id=" + getParameterByName("id", window.location),
    success: parseEvent,
    error: function (xhr, status, error) {
        alert(error);
        //swal("Error!", error, "error");
    }
});

function parseEvent(data) {
    //parse JSON data
    event = JSON.parse(data);

    setTitle(event.title);

    $("#eventId").val(event._id);
    $("#sportInput").val(event.sport);
    $("#eventTitleInput").val(event.title);
    $("#eventDescriptionInput").val(event.description);
    $("#dateAndTimeInput").val(event.dateandtime);
    $("#durationInput").val(event.duration);
    //$("#latitudeInput").val(event.latitude);
    //$("#longitudeInput").val(event.longitude);

    var editBtn = document.getElementById('edit-btn');
    var user = getCookie('user');
    if (user === event.createdBy)
        editBtn.style.visibility = 'visible';
    else
        editBtn.style.visibility = 'hidden';

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

    var image = '../images/markers/' + event.sport.toLowerCase() + '.png';
    //place the initial marker
    var marker = new google.maps.Marker({
        position: coords,
        map: map,
        icon: image,
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
    //swal("Error!", "Geolocation API not supported.", "error");
}

//function reverseGeocodeCurrentLocation(position) {
//    var latitude = position.coords.latitude;
//    var longitude = position.coords.longitude;
//    var coords = new google.maps.LatLng(latitude, longitude);

//    ReverseGeocode(latitude, longitude);
//}


//document.getElementById('attend-btn').addEventListener('touchend', function (ev) {

//    var title = $("#eventTitleInput").val();

//    alert("You have successfully attended this event!");
//    //swal("Success!", "You have successfully attended this event!", "success");
//});