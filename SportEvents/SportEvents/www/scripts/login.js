document.getElementById('register-btn').addEventListener('touchend', function (ev) {
    window.location.href = "register.html";
});

document.getElementById('login-btn').addEventListener('touchend', function (ev) {
    var username = $('#Username').val();
    var password = $('#Password').val();

    if (username == "" | username == null) {
        //swal("Error!", "You have to enter the username!", "error");
        //$('#Username').focus();

        //nešto bolje upravljanje
        swal({
            title: "Error!",
            text: "You have to enter the username!",
            type: "error"
        }, function () {
            setTimeout(function () {
                $('#Username').focus();
            }, 200);
        });
    }
    else if (password == "" || password == null) {
        //swal("Error!", "You have to enter the password!", "error");
        //$('#Password').focus();

        //nešto bolje upravljanje
        swal({
            title: "Error!",
            text: "You have to enter the password!",
            type: "error"
        }, function () {
            setTimeout(function () {
                $('#Password').focus();
            }, 200);
        });
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

    setCookie("user", user.username, 30);

    //nešto bolje upravljanje
    swal({
        title: "Success!",
        text: "You have successfully logged in!",
        timer: 2000,
        type: "success"
    }, function () {
        window.location.href = "home.html";
    });

    //swal("Success!", "You have successfully logged in!", "success");
    //setTimeout(function () {
    //    window.location.href = "home.html";
    //}, 2000);
}

function processError(xhr, status, error) {
    //alert("An error occured: " + xhr + status + error);
    //swal("Error!", "Wrong username or password!", "error");

    swal({
        title: "Error!",
        text: "Wrong username or password!",
        type: "error"
    }, function () {
        setTimeout(function () {
            $('#Username').focus();
        }, 200);
    });
}