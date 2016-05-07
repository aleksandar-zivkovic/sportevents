// when you open this view, populate the list with users from mongoDB database

//loadTestUsers();

loadUsers();

function loadTestUsers() {

    var list = document.getElementById('users-list');
    var entry = document.createElement('li');
    var aEntry = document.createElement('a');
    aEntry.setAttribute("href", "#");
    entry.appendChild(aEntry);
    aEntry.appendChild(document.createTextNode("test"));

    list.appendChild(entry);
}

function loadUsers() {

    var list = document.getElementById('users-list');

    var usersArray;

    //load data from NodeJS and mongoDB database
    $.ajax({
        type: 'GET',
        url: 'http://vasic.ddns.net/users/getusers',
        data: "",
        success: processUsers,
        error: function (xhr, status, error) {
            alert(error.message);
        }
    });
}

function processUsers(data) {
    //parse JSON data
    usersArray = JSON.parse(data);

    //foreach user in users do
    for (var i = 0; i < usersArray.length; i++) {
        var entry = document.createElement('li');
        var aEntry = document.createElement('a');
        aEntry.setAttribute("href", "user.html?id=" + usersArray[i]._id);
        entry.appendChild(aEntry);
        aEntry.appendChild(document.createTextNode(usersArray[i].username));
        list.appendChild(entry);
    }
}

