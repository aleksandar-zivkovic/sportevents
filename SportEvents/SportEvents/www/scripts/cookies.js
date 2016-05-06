// setCookie("user", username, 30);
function setCookie(cname, cvalue, exminutes) {
    window.localStorage.setItem('username', cvalue);

    //var d = new Date();
    //d.setTime(d.getTime() + (exminutes * 60 * 1000));
    //var expires = "expires=" + d.toUTCString();
    //document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    return window.localStorage.getItem('username');

    //var name = cname + "=";
    //var ca = document.cookie.split(';');
    //for (var i = 0; i < ca.length; i++) {
    //    var c = ca[i];
    //    while (c.charAt(0) == ' ') c = c.substring(1);
    //    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    //}
    //return "";
}

function checkCookie() {
    //var user = getCookie("user");
    var user = window.localStorage.getItem('username');
    if (user != "") {
        document.getElementById("user").value = user;
    }
    else {
        window.location.replace("login.html");
    }
}