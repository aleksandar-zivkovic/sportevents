
document.getElementById('publish-btn').addEventListener('touchend', function (ev) {

    var title = document.getElementById('eventTitleInput').value;
    var description = document.getElementById('eventDescriptionInput').value;

    var e = document.getElementById('sportInput');
    var sport = e.options[e.selectedIndex].text;

    var dateAndTime = document.getElementById("dateAndTimeInput").value;
    var duration = document.getElementById("durationInput").value;

    var latitude = document.getElementById('latitudeInput').value;
    var longitude = document.getElementById('longitudeInput').value;

    //$.ajax({
    //    type: 'GET',
    //    url: 'http://vasic.ddns.net/events/verify',
    //    data: "title=" + title,
    //    success: $('#title_error').hide(),
    //    error: $('#title_error').show()
    //});

    var newEvent = {
        "title": title,
        "description": description,
        "sport": sport,
        "dateandtime": dateAndTime,
        "duration": duration,
        "latitude": latitude,
        "longitude": longitude,
        "createdBy": getCookie('user') 
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

var marker;

function showCurrentLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var coords = new google.maps.LatLng(latitude, longitude);

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

    //show current location
    var image = 'images/currentlocation.png';
    var currentLocationMarker = new google.maps.Marker({
        position: coords,
        map: map,
        icon: image,
        title: "Current location"
    });

    currentLocationMarker.addListener('click', function () {
        window.location = "profile.html";
    });

    //place the initial marker
    marker = new google.maps.Marker({
        position: coords,
        title: "This is your location!"
    }, function (marker) {
        marker.showInfoWindow();
    });

    //marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, function () {
    //    marker.showInfoWindow();
    //});

    google.maps.event.addListener(map, 'click', function (event) {
        //removing previous marker
        marker.setMap(null);

        //swal("Success!", event.latLng, "success");
        var myLatLng = event.latLng;
        var lat = myLatLng.lat();
        var lng = myLatLng.lng();
        $("#latitudeInput").val(lat);
        $("#longitudeInput").val(lng);

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map,
            title: "This is event location!"
        }, function (marker) {
            marker.showInfoWindow();
        });

        ReverseGeocode(lat, lng);
    });
}



//google.maps.event.addDomListener(window, 'load', initialize);


$('#eventTitleInput').keyup(function () {

    $('#title_error').hide();

});