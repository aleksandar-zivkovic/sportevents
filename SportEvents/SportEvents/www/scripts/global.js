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
        location.reload();
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

        var eventsArray;

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

        function processEvents(data) {
            //parse JSON data
            eventsArray = JSON.parse(data);

            for (var i = 0; i < eventsArray.length; i++) {
                var image = '/../images/markers/' + eventsArray[i].sport + '.png';
                var coords = new google.maps.LatLng(eventsArray[i].latitude, eventsArray[i].longitude);
                var marker = new google.maps.Marker({
                    position: coords,
                    map: map,
                    icon: image,
                    title: eventsArray[i].title
                });
            }
        }
    });
}