loadUsers();

var e = document.getElementById('sportInput');
e.addEventListener("change", loadEvents);

var e2 = document.getElementById('createdByInput');
e2.addEventListener("change", loadEvents);

function loadEvents() {

    var list = document.getElementById('events-list');
    // empty the list
    $('li').remove();  
    var eventsArray;
    var sport = e.options[e.selectedIndex].text;
    var createdBy = e2.options[e2.selectedIndex].text;

    //load data from NodeJS and mongoDB database
    $.ajax({
        type: 'GET',
        url: 'http://vasic.ddns.net/events/geteventsbysport',
        data: "sport=" + sport + "&createdBy=" + createdBy,
        success: processEvents,
        error: function (xhr, status, error) {
            swal({
                title: "Error!",
                text: "Error while loading events.\nMessage: " + error,
                timer: 5000,
                type: "error"
            });
        }
    });
}

function processEvents(data) {
    eventsArray = JSON.parse(data);

    for (var i = 0; i < eventsArray.length; i++) {
        var entry = document.createElement('li');
        var aEntry = document.createElement('a');
        aEntry.setAttribute("href", "event.html?id=" + eventsArray[i]._id);
        entry.appendChild(aEntry);
        aEntry.appendChild(document.createTextNode(eventsArray[i].title));
        list.appendChild(entry);
    }
}

function loadUsers() {

    //load data from NodeJS and mongoDB database
    $.ajax({
        type: 'GET',
        url: 'http://vasic.ddns.net/users/getusers',
        data: "",
        success: processUsers,
        error: function (xhr, status, error) {
            swal({
                title: "Error!",
                text: "Error while loading users.\nMessage: " + error,
                timer: 5000,
                type: "error"
            });
        }
    });
}

function processUsers(data) {
    var index = 0;
    //parse JSON data
    usersArray = JSON.parse(data);

    for (element in usersArray) {
        var opt = document.createElement("option");
        opt.value = index;
        opt.innerHTML = usersArray[element].username; // whatever property it has

        // then append it to the select element
        e2.appendChild(opt);
        index++;
    }
}




