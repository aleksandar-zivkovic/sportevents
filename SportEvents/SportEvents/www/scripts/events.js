// when you open this view, populate the list with events from mongoDB database

//loadTestEvents();

loadEvents();

function loadTestEvents() {

    var list = document.getElementById('events-list');
    var entry = document.createElement('li');
    var aEntry = document.createElement('a');
    aEntry.setAttribute("href", "#");
    entry.appendChild(aEntry);
    aEntry.appendChild(document.createTextNode("test"));

    list.appendChild(entry);
}

function loadEvents() {

    var list = document.getElementById('events-list');

    var eventsArray;

    //load data from NodeJS and mongoDB database
    $.ajax({
        type: 'GET',
        url: 'http://vasic.ddns.net/users/getevents',
        data: "",
        success: processEvents,
        error: function (xhr, status, error) {
            alert(error.message);
        }
    });
}

function processEvents(data) {
    //parse JSON data
    eventsArray = JSON.parse(data);

    //foreach user in users do
    for (var i = 0; i < eventsArray.length; i++) {
        var entry = document.createElement('li');
        var aEntry = document.createElement('a');
        aEntry.setAttribute("href", "");
        entry.appendChild(aEntry);
        aEntry.appendChild(document.createTextNode(eventsArray[i].title));
        list.appendChild(entry);
    }
}