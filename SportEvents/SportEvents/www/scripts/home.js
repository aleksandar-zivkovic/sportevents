var canvas = document.getElementById('map');
var ctx = canvas.getContext("2d");

var image = new Image();
image.onload = function () {
    window.onresize = fitToContainer;
    fitToContainer();
};
image.src = "../images/logo.png";

function fitToContainer() {

    var div = $('#mapcontext'),
        w = div.width(),
        h = div.height();

    canvas.width = w;
    canvas.height = h;

    ctx.drawImage(image, 0, 0, w, h);
}

checkCookie();

//$("#logout-btn").val("Logout [" + getCookie("user") + "]");

$("#logout-btn").val("Logout");