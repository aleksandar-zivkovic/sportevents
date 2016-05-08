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