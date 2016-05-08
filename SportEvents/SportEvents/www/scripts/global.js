function setTitle(text) {
    var title = $("#action-bar-title-text");
    if (title != null)
        title.html(text);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//google.maps.LatLng.prototype.distanceFrom = function (latlng) {
//    var lat = [this.lat(), latlng.lat()]
//    var lng = [this.lng(), latlng.lng()]
//    var R = 6378137;
//    var dLat = (lat[1] - lat[0]) * Math.PI / 180;
//    var dLng = (lng[1] - lng[0]) * Math.PI / 180;
//    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//    Math.cos(lat[0] * Math.PI / 180) * Math.cos(lat[1] * Math.PI / 180) *
//    Math.sin(dLng / 2) * Math.sin(dLng / 2);
//    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//    var d = R * c;
//    return Math.round(d);
//}

var rad = function (x) {
    return x * Math.PI / 180;
};

var getDistance = function (p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat() - p1.lat());
    var dLong = rad(p2.lng() - p1.lng());
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};

var backBtn = document.getElementById('back-btn');
if (backBtn != null) {
    backBtn.addEventListener('touchend', function (ev) {
        window.history.back();
    });
}

var eventsBtn = document.getElementById('events-btn');
if (eventsBtn != null) {
    eventsBtn.addEventListener('touchend', function (ev) {
        window.location = "events.html";
    });
}

var usersBtn = document.getElementById('users-btn');
if (usersBtn != null) {
    usersBtn.addEventListener('touchend', function (ev) {
        window.location = "users.html";
    });
}

var profileBtn = document.getElementById('profile-btn');
if (profileBtn != null) {
    profileBtn.addEventListener('touchend', function (ev) {
        window.location = "profile.html";
    });
}

var addEventBtn = document.getElementById('addEvent-btn');
if (addEventBtn != null) {
    addEventBtn.addEventListener('touchend', function (ev) {
        window.location = "addEvent.html";
    });
}

var logoutBtn = document.getElementById('logout-btn');
if (logoutBtn != null) {
    logoutBtn.addEventListener('touchend', function (ev) {
        setCookie("user", "", 30);

        swal({
            title: "Success!",
            text: "Successfully loged out.",
            timer: 5000,
            type: "success"
        }, function () {
            window.location = "login.html";
        });
    });
}

var editBtn = document.getElementById('edit-btn');
if (editBtn != null) {
    editBtn.addEventListener('touchend', function (ev) {
        var value = editBtn.value;
        if (value == "Edit event") {
            $("#edit-btn").val("Save event");
            $("#edit-btn-text").html("Save event");
            $("#eventTitleInput").attr('readonly', false);
            $("#eventDescriptionInput").attr('readonly', false);
            $("#dateAndTimeInput").attr('readonly', false);
            $("#durationInput").attr('readonly', false);
        }
        else {
            $("#edit-btn").val("Edit event");
            $("#edit-btn-text").html("Edit event");
            $("#eventTitleInput").attr('readonly', true);
            $("#eventDescriptionInput").attr('readonly', true);
            $("#dateAndTimeInput").attr('readonly', true);
            $("#durationInput").attr('readonly', true);
            
            var id = document.getElementById('eventId').value;
            var title = document.getElementById('eventTitleInput').value;
            var description = document.getElementById('eventDescriptionInput').value;
            var dateAndTime = document.getElementById("dateAndTimeInput").value;
            var duration = document.getElementById("durationInput").value;

            var stringEvent =
                "id=" + id +
                "&title=" + title +
                "&description=" + description +
                "&dateandtime=" + dateAndTime +
                "&duration=" + duration;

            $.ajax({
                type: 'GET',
                url: 'http://vasic.ddns.net/events/updateevent',
                data: stringEvent,
                success: function () {
                    swal({
                        title: "Success!",
                        text: "You have successfully updated an event!",
                        timer: 5000,
                        type: "success"
                    });
                },
                error: function (xhr, status, error) {
                    swal({
                        title: "Error!",
                        text: "Error while updating event.\nMessage: " + error,
                        timer: 5000,
                        type: "error"
                    });
                }
            });
        }
    });
}

var deleteBtn = document.getElementById('delete-btn');
if (deleteBtn != null) {
    deleteBtn.addEventListener('touchend', function (ev) {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this event!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            cancelButtonText: "No!",
            closeOnConfirm: false
        }, function (isConfirm) {
            if (isConfirm) {
                //ajax query to delete event
                var id = document.getElementById('eventId').value;

                $.ajax({
                    type: 'GET',
                    url: 'http://vasic.ddns.net/events/deleteevent',
                    data: "id=" + id,
                    success: function () {
                        swal({
                            title: "Success!",
                            text: "You have successfully deleted an event!",
                            timer: 5000,
                            type: "success"
                        }, function () {
                            window.location = "home.html";
                        });
                    },
                    error: function (xhr, status, error) {
                        swal({
                            title: "Error!",
                            text: "Error while deleting event.\nMessage: " + error,
                            timer: 5000,
                            type: "error"
                        });
                    }
                });
            }
        });
    })
}
function ReverseGeocode(latitude, longitude) {
    var reverseGeocoder = new google.maps.Geocoder();
    var currentPosition = new google.maps.LatLng(latitude, longitude);
    reverseGeocoder.geocode({ 'latLng': currentPosition }, function (results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                $("#addressInput").val(results[0].formatted_address);
            }
            else {
                return "";
            }
        }
        else {
            return "";
        }
    });
}

function showEventsOnMap() {
    navigator.geolocation.getCurrentPosition(function (position) {
        var nearby;
        if (getParameterByName("nearby", window.location) === "true")
            nearby = true;
        else
            nearby = false;

        if (nearby)
            setTitle("Nearby");
        else
            setTitle("Map view");

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var currentCoords = new google.maps.LatLng(latitude, longitude);

        var mapOptions = {
            zoom: 14,
            center: currentCoords,
            mapTypeControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        //create the map, and place it in the HTML map div
        map = new google.maps.Map(
            document.getElementById("map"), mapOptions
        );

        //load data from NodeJS and mongoDB database
        $.ajax({
            type: 'GET',
            url: 'http://vasic.ddns.net/events/getevents',
            data: "",
            success: processEvents,
            error: function (xhr, status, error) {
                swal({
                    title: "Error!",
                    text: "Error while reading events.\nMessage: " + error,
                    timer: 5000,
                    type: "error"
                });
            }
        });

        var eventsArray;
        function processEvents(data) {
            eventsArray = JSON.parse(data);

            for (var i = 0; i < eventsArray.length; i++) {
                var image = 'images/' + eventsArray[i].sport.toLowerCase() + '.png';
                var coords = new google.maps.LatLng(eventsArray[i].latitude, eventsArray[i].longitude);
                //var distance = currentCoords.distanceFrom(coords);
                var show;
                if (!nearby)
                    show = true;
                else {
                    var distance = getDistance(currentCoords, coords);
                    if (distance < 1000)
                        show = true;
                    else
                        show = false;
                }
                if (show) {
                    var marker = new google.maps.Marker({
                        position: coords,
                        map: map,
                        icon: image,
                        title: eventsArray[i].title
                    });

                    marker.id = eventsArray[i]._id;
                    marker.addListener('click', function () {
                        window.location = "event.html?id=" + this.id;
                    });
                }
            }

            showCurrentLocation(map, nearby);
        }
    });
}

function showCurrentLocation(map, nearby) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var coords = new google.maps.LatLng(latitude, longitude);

        if (map == null) {
            var mapOptions = {
                zoom: 14,
                center: coords,
                mapTypeControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            //create the map, and place it in the HTML map div
            map = new google.maps.Map(
                document.getElementById("map"), mapOptions
            );
        }
        
        //show current location
        var image = 'images/currentlocation.png';
        var currentLocationMarker = new google.maps.Marker({
            position: coords,
            map: map,
            icon: image,
            title: "Current location"
        });

        if (nearby) {
            var circle = new google.maps.Circle({
                map: map,
                radius: 1000,
                fillColor: '#AA0000'
            });
            circle.bindTo('center', currentLocationMarker, 'position');
        }

        currentLocationMarker.addListener('click', function () {
            window.location = "profile.html";
        });
    });
}