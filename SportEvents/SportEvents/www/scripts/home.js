document.getElementById('test-btn').addEventListener('touchend', function (ev) {
    var newUser = {
        "username": "test",
        "email": "test",
        "fullname": "test"
    };

    var string = encodeURIComponent(newUser);

    $.ajax({
        type: 'POST',
        url: 'http://vasic.ddns.net/users/adduser',
        data: string,
        success: function (data) {
            var ret = jQuery.parseJSON(data);
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        }
    });
});