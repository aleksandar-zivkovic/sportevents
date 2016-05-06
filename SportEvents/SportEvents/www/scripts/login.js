document.getElementById('register-btn').addEventListener('touchend', function (ev) {
    window.location.href = "register.html";
});

document.getElementById('login-btn').addEventListener('touchend', function (ev) {
    var username = $('#Username').val();
    var password = $('#Password').val();

    if (username == "" | username == null) {
        swal("Error!", "You have to enter the username!", "error");
        $('#Username').focus();
    }
    else if (password == "" || password == null) {
        swal("Error!", "You have to enter the password!", "error");
        $('#Password').focus();
    }
    else {

        $.ajax({
            type: 'GET',
            url: 'http://vasic.ddns.net/users/check',
            data: "username=" + username + "&password=" + password,
            success: processSuccess,
            error: processError
        });

    }
});

function processSuccess(data) {
    //parse JSON data
    user = JSON.parse(data);

    swal("Success!", "You have successfully logged in!", "success");
    setCookie("user", user.username, 30);
    window.location.href = "home.html";
}

function processError(xhr, status, error) {
    //alert("An error occured: " + xhr + status + error);
    swal("Error!", "Wrong username or password!", "error");
}