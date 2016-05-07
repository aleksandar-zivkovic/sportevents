document.getElementById('login-btn').addEventListener('touchend', function (ev) {
    window.location.href = "login.html";
});

var registerBtn = document.getElementById('register-btn');
registerBtn.addEventListener('touchend', function (ev) {
    var username = $('#Username').val();
    var password = $('#Password').val();
    var confirmPassword = $('#ConfirmPassword').val();
    var email = $('#Email').val();    

    if (username == "" | username == null) {
        //swal("Warning!", "You have to enter the username!", "warning");
        //$('#Username').focus();
        
        swal({
            title: "Warning!",
            text: "You have to enter the username!",
            type: "warning"
        }, function () {
            setTimeout(function () {
                $('#Username').focus();
            }, 200);
        });
    }
    else if (password == "" || password == null) {
        //swal("Warning!", "You have to enter the password!", "warning");
        //$('#Password').focus();

        swal({
            title: "Warning!",
            text: "You have to enter the password!",
            type: "warning"
        }, function () {
            setTimeout(function () {
                $('#Password').focus();
            }, 200);
        });
    }
    else if (password.length < 6) {
        //swal("Warning!", "Password must containt 6 or more characters!", "warning");
        //$('#Password').focus();

        swal({
            title: "Warning!",
            text: "Password must containt 6 or more characters!",
            type: "warning"
        }, function () {
            setTimeout(function () {
                $('#Password').focus();
            }, 200);
        });
    }
    else if (password != confirmPassword) {
        //swal("Warning!", "Password do not match!", "warning");
        //$('#ConfirmPassword').focus();

        swal({
            title: "Warning!",
            text: "Password do not match!",
            type: "warning"
        }, function () {
            setTimeout(function () {
                $('#ConfirmPassword').focus();
            }, 200);
        });
    }
    else if (email == "" || email == null) {
        //swal("Warning!", "You have to enter email address!", "warning");
        //$('#Email').focus();

        swal({
            title: "Warning!",
            text: "You have to enter email address!",
            type: "warning"
        }, function () {
            setTimeout(function () {
                $('#Email').focus();
            }, 200);
        });
    }
    else if (!validate_email(email)) {
        //swal("Warning!", "Email address is not in good format!\nEnter your email address again.", "warning");
        //$('#Email').focus();

        swal({
            title: "Warning!",
            text: "Email address is not in good format!\nEnter your email address again.",
            type: "warning"
        }, function () {
            setTimeout(function () {
                $('#Email').focus();
            }, 200);
        });
    }
    //else if ($('#Username_error').is(':visible'))
    //    swal("Warning!", "You have to choose unique username!", "warning");
    else {
        $.ajax({
            type: 'GET',
            url: 'http://vasic.ddns.net/users/verify',
            data: "username=" + username,
            success: askForNewUsername,  //$('#Username_error').show(),
            error: processRegistration
        });

        function askForNewUsername() {
            //swal("Warning!", "Username has already registred.\nPlease enter unique one.", "warning");
            //$('#Username').focus();

            swal({
                title: "Error!",
                text: "Username has already registred.\nPlease enter unique one.",
                type: "error"
            }, function () {
                setTimeout(function () {
                    $('#Username').focus();
                }, 200);
            });
        }

        function processRegistration() {
            // post user to database
            var newUser = {
                "username": username,
                "password": password,
                "email": email
            };

            var string = encodeURIComponent(JSON.stringify(newUser));

            $.ajax({
                type: 'POST',
                url: 'http://vasic.ddns.net/users/adduser',
                data: string,
                success: function () {
                    swal("Success!", "You have successfully created an account!", "warning");
                    //alert("You have successfully created an account!");
                },
                error: function (xhr, status, error) {
                    //alert("An error occured: " + xhr + status + error);
                    //alert("You have successfully created an account!");
                    swal("Success!", "You have successfully created an account!", "warning");
                }
            });
            window.location.href = "login.html";
        }        
    }
});

document.getElementById('action-bar-home-btn').style.display = 'none';

function validate_email(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

//$('#Username').keyup(function () {
//    $('#Username_error').hide();
//});