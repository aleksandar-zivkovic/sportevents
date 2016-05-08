// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    // Wait for Cordova to load
    //
    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    // Cordova is ready
    //
    function onDeviceReady() {

        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        //// Cordova notifications
        //navigator.notification.alert("This is some test notification!", null, "Information", "OK");
        //navigator.notification.beep;
        //navigator.notification.vibrate;

        // Cordova batty status LOW
        window.addEventListener("batterylow", onBatteryLow, false);
        function onBatteryLow(info) {
            // the battery low event
            swal({
                title: "Warning!",
                text: "Battery Level Low " + info.level + "%",
                timer: 5000,
                type: "warning"
            });
        }
        // Cordova batty status CRITICAL
        window.addEventListener("batterycritical", onBatteryCritical, false);
        function onBatteryCritical(info) {
            // the battery critical event
            swal({
                title: "Warning!",
                text: "Battery Level Critical " + info.level + "%",
                timer: 5000,
                type: "warning"
            });
        }


    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

})();

var canvas = document.getElementById('logo');
var ctx = canvas.getContext("2d");

var image = new Image();
image.src = "images/logo.png";
image.onload = function () {
    window.onresize = fitToContainer;
    fitToContainer();
};

function fitToContainer() {

    var div = $('#logocontext'),
        w = div.width(),
        h = div.height();

    canvas.width = w;
    canvas.height = h;

    ctx.drawImage(image, 0, 0, w, h);
}

checkCookie();

$("#logout-btn").val("Logout");
