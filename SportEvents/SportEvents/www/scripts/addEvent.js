
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

// ---------------------------------------------------------
//                                                  MAP PART
// ---------------------------------------------------------

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showCurrentLocation);
}
else {
    alert("Geolocation API not supported.");
}

function showCurrentLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var coords = new google.maps.LatLng(latitude, longitude);

    var mapOptions = {
        zoom: 15,
        center: coords,
        mapTypeControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //create the map, and place it in the HTML map div
    map = new google.maps.Map(
    document.getElementById("map"), mapOptions
    );

    //remove map type buttons
    map.mapTypeControl = false;
    //map.streetView = false;

    //place the initial marker
    var marker = new google.maps.Marker({
        position: coords,
        map: map,
        title: "This is your location!"
    }, function (marker) {
        marker.showInfoWindow();
    });

    marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, function () {
        marker.showInfoWindow();
    });

    google.maps.event.addListener(map, 'click', function (event) {

        //swal("Success!", event.latLng, "success");
        var myLatLng = event.latLng;
        var lat = myLatLng.lat();
        var lng = myLatLng.lng();
        $("#latitudeInput").val(lat);
        $("#longitudeInput").val(lng);

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon),
            map: map,
            title: "This is event location!"
        }, function (marker) {
            marker.showInfoWindow();
        });
    });
}



//google.maps.event.addDomListener(window, 'load', initialize);


