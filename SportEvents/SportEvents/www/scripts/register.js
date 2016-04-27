document.getElementById('login-btn').addEventListener('touchend', function (ev) {
    window.location.href = "login.html";
});

var registerBtn = document.getElementById('register-btn');
registerBtn.addEventListener('touchend', function (ev) {
    window.location.href = "home.html";
});

document.getElementById('action-bar-home-btn').style.display = 'none';