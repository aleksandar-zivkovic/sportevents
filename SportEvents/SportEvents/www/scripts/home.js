document.getElementById('test-btn').addEventListener('touchend', function (ev) {
    var newUser = {
        "username": "test",
        "email": "test",
        "fullname": "test"
    };

    var string = encodeURIComponent(JSON.stringify(newUser));

    //// Use AJAX to post the object to our adduser service
    //$.ajax({
    //    type: 'POST',
    //    data: newUser,
    //    url: 'http://vasic.ddns.net/',
    //    dataType: 'JSON'
    //}).done(function (response) {

    //    // Check for successful (blank) response
    //    if (response.msg === '') {
    //        alert('Success!');
    //    }
    //    else {
    //        // If something goes wrong, alert the error message that our service returned
    //        alert('Error:' + response.msg);
    //    }
    //});

    $.ajax({
        type: 'POST',
        url: 'http://vasic.ddns.net/users/adduser',
        data: string,
        success: function (data) {
            var ret = jQuery.parseJSON(data);
            //$('#lblResponse').html(ret.msg);
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
            //$('#lblResponse').html('Error connecting to the server.');
        }
    });
});