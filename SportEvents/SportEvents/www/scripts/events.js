// when you open this view, populate the list with events from mongoDB database

//loadTestEvents();

loadEvents();

//function loadTestEvents() {

//    var list = document.getElementById('events-list');
//    var entry = document.createElement('li');
//    var aEntry = document.createElement('a');
//    aEntry.setAttribute("href", "#");
//    entry.appendChild(aEntry);
//    aEntry.appendChild(document.createTextNode("test"));

//    list.appendChild(entry);
//}

function loadEvents() {

    var list = document.getElementById('events-list');

    var eventsArray;

    //load data from NodeJS and mongoDB database
    $.ajax({
        type: 'GET',
        url: 'http://vasic.ddns.net/events/getevents',
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

    //foreach event in events do
    for (var i = 0; i < eventsArray.length; i++) {
        var entry = document.createElement('li');
        var aEntry = document.createElement('a');
        aEntry.setAttribute("href", "event.html?id=" + eventsArray[i]._id);
        entry.appendChild(aEntry);
        aEntry.appendChild(document.createTextNode(eventsArray[i].title));
        list.appendChild(entry);

        //$(entry).click(function () {
        //    //sessionStorage.param1 = eventsArray[i]._id;
        //    window.location.replace("event.html");
        //});
    }
}