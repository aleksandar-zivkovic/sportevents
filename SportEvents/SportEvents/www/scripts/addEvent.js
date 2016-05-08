document.getElementById('publish-btn').addEventListener('touchend', function (ev) {
    var title = document.getElementById('eventTitleInput').value;
    var description = document.getElementById('eventDescriptionInput').value;
    var e = document.getElementById('sportInput');
    var sport = e.options[e.selectedIndex].text;
    var dateAndTime = document.getElementById("dateAndTimeInput").value;
    var duration = document.getElementById("durationInput").value;
    var latitude = document.getElementById('latitudeInput').value;
    var longitude = document.getElementById('longitudeInput').value;

    if (title == "" | title == null) {
        swal({
            title: "Warning!",
            text: "You have to enter the event title!",
            type: "warning"
        }, function () {
            setTimeout(function () {
                $('#eventTitleInput').focus();
            }, 200);
        });
    }
    else if (title.length < 5) {
        swal({
            title: "Warning!",
            text: "Event title must containt 5 or more characters!",
            type: "warning"
        }, function () {
            setTimeout(function () {
                $('#eventTitleInput').focus();
            }, 200);
        });
    }
    else if (description == "" | description == null) {
        swal({
            title: "Warning!",
            text: "You have to enter the event description!",
            type: "warning"
        }, function () {
            setTimeout(function () {
                $('#eventDescriptionInput').focus();
            }, 200);
        });
    }
    else if (description.length < 5) {
        swal({
            title: "Warning!",
            text: "Event description must containt 5 or more characters!",
            type: "warning"
        }, function () {
            setTimeout(function () {
                $('#eventDescriptionInput').focus();
            }, 200);
        });
    }
    else if (dateAndTime == "" | dateAndTime == null) {
        swal({
            title: "Warning!",
            text: "You have to enter the event date and time!",
            type: "warning"
        }, function () {
            setTimeout(function () {
                $('#dateAndTimeInput').focus();
            }, 200);
        });
    }
    else if (latitude == "" | latitude == null | longitude == "" | longitude == null) {
        swal({
            title: "Warning!",
            text: "You have to pick the event location on map!",
            type: "warning"
        });
    }
    else {
        var eventString =
            "title=" + title +
            "&description=" + description +
            "&sport=" + sport +
            "&dateandtime=" + dateAndTime +
            "&duration=" + duration +
            "&latitude=" + latitude +
            "&longitude=" + longitude +
            "&createdBy=" + getCookie('user');

        $.ajax({
            type: 'GET',
            url: 'http://vasic.ddns.net/events/addevent',
            data: eventString,
            success: function (data) {
                swal({
                    title: "Success!",
                    text: "You have successfully published an event!",
                    timer: 5000,
                    type: "success"
                }, function () {
                    event = JSON.parse(data);
                    window.location = "event.html?id=" + event._id;
                });
            },
            error: function (xhr, status, error) {
                swal({
                    title: "Error!",
                    text: "Error while adding event.\nMessage: " + error,
                    timer: 5000,
                    type: "error"
                });
            }
        });
    }
});

// ---------------------------------------------------------
//                                                  MAP PART
// ---------------------------------------------------------

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showCurrentLocation);
}
else {
    swal({
        title: "Error!",
        text: "Geolocation API not supported.",
        timer: 5000,
        type: "error"
    });
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

    google.maps.event.addListener(map, 'click', function (event) {
        //removing previous marker
        if (marker != null)
            marker.setMap(null);

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