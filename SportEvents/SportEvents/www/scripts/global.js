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
        //window.location = "login.html";
        setCookie("user", "", 30);
        //location.reload();

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
            $("#eventTitleInput").attr('readonly', false);
            $("#eventDescriptionInput").attr('readonly', false);
            $("#dateAndTimeInput").attr('readonly', false);
            $("#durationInput").attr('readonly', false);
        }
        else {
            $("#edit-btn").val("Edit event");
            $("#eventTitleInput").attr('readonly', true);
            $("#eventDescriptionInput").attr('readonly', true);
            $("#dateAndTimeInput").attr('readonly', true);
            $("#durationInput").attr('readonly', true);
            
            var id = document.getElementById('eventId').value;
            var title = document.getElementById('eventTitleInput').value;
            var description = document.getElementById('eventDescriptionInput').value;
            var dateAndTime = document.getElementById("dateAndTimeInput").value;
            var duration = document.getElementById("durationInput").value;

            var newEvent = {
                "id": id,
                "title": title,
                "description": description,
                "dateandtime": dateAndTime,
                "duration": duration
            };

            var string = encodeURIComponent(JSON.stringify(newEvent));

            $.ajax({
                type: 'POST',
                url: 'http://vasic.ddns.net/events/updateevent',
                data: string,
                success: function () {
                    alert("You have successfully updated an event!");
                },
                error: function (xhr, status, error) {
                    //alert("An error occured: " + xhr + status + error);
                    alert("You have successfully updated an event!");
                }
            });
        }
    });
}

function ReverseGeocode(latitude, longitude) {
    var reverseGeocoder = new google.maps.Geocoder();
    var currentPosition = new google.maps.LatLng(latitude, longitude);
    reverseGeocoder.geocode({ 'latLng': currentPosition }, function (results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                //return results[0].formatted_address;
                $("#addressInput").val(results[0].formatted_address);
                //navigator.notification.alert('Address : ' + results[0].formatted_address + ',' + 'Type : ' + results[0].types);
            }
            else {
                return "";
                //navigator.notification.alert('Unable to detect your address.');
            }
        } else {
            return "";
            //navigator.notification.alert('Unable to detect your address.');
        }
    });
}

function showEventsOnMap() {
    navigator.geolocation.getCurrentPosition(function (position) {
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

        //load data from NodeJS and mongoDB database
        $.ajax({
            type: 'GET',
            url: 'http://vasic.ddns.net/events/getevents',
            data: "",
            success: processEvents,
            error: function (xhr, status, error) {
                alert(error.message);
            }
        });

        var eventsArray;

        function processEvents(data) {
            //parse JSON data
            eventsArray = JSON.parse(data);

            for (var i = 0; i < eventsArray.length; i++) {
                var image = 'images/' + eventsArray[i].sport.toLowerCase() + '.png';
                var coords = new google.maps.LatLng(eventsArray[i].latitude, eventsArray[i].longitude);
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
    });
}

function showCurrentLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
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
    });
}