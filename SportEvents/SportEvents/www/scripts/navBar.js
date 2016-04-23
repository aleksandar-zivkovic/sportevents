document.getElementById('home').addEventListener('touchend', function (ev) {
    window.parent.location.href = "http://localhost:4400/index.html";
});

document.getElementById('viewProfile').addEventListener('touchend', function (ev) {
    window.parent.location.href = "http://localhost:4400/viewProfile.html";
});

document.getElementById('viewEvents').addEventListener('touchend', function (ev) {
    window.parent.location.href = "http://localhost:4400/viewEvents.html";
});

document.getElementById('editEvent').addEventListener('touchend', function (ev) {
    window.parent.location.href = "http://localhost:4400/editEvent.html";
});

document.getElementById('viewUserlist').addEventListener('touchend', function (ev) {
    window.parent.location.href = "http://localhost:3000/";
});

document.getElementById('logout').addEventListener('touchend', function (ev) {
    window.parent.location.href = "http://localhost:4400/login.html";
});


