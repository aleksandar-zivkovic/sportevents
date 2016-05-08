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
    else {
        $.ajax({
            type: 'GET',
            url: 'http://vasic.ddns.net/users/verify',
            data: "username=" + username,
            success: askForNewUsername,
            error: processRegistration
        });

        function askForNewUsername() {
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
            var newUser = {
                "username": username,
                "password": password,
                "email": email
            };

            var string = encodeURIComponent(JSON.stringify(newUser));

            function registerError() {
                swal({
                    title: "Error!",
                    text: "Error while trying to register!",
                    type: "error"
                }, function () {
                    setTimeout(function () {
                        $('#Username').focus();
                    }, 200);

                });
            }

            function registerSuccess() {
                swal({
                    title: "Success!",
                    text: "You have successfully created an account!",
                    type: "success"
                }, function () {
                    setTimeout(function () {
                        $('#Username').focus();
                    }, 200);
                    window.location.href = "login.html";
                });
            }

            $.ajax({
                type: 'GET',
                url: 'http://vasic.ddns.net/users/adduserget',
                data: "username=" + username + "&password=" + password + "&email=" + email,
                success: registerSuccess,
                error: registerError
            });
            
        }        
    }
});

document.getElementById('action-bar-home-btn').style.display = 'none';

function validate_email(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}