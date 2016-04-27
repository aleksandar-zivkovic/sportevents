function setTitle(text) {
    var title = $("#action-bar-title-text");
    if (title != null)
        title.html(text);
}

var backBtn = document.getElementById('back-btn');
if (backBtn != null) {
    backBtn.addEventListener('touchend', function (ev) {
        window.history.back();
    });
}

var eventsBtn = document.getElementById('events-btn');
if (eventsBtn != null) {
    eventsBtn.addEventListener('touchend', function (ev) {
        window.location = "events.html";
    });
}

var usersBtn = document.getElementById('users-btn');
if (usersBtn != null) {
    usersBtn.addEventListener('touchend', function (ev) {
        window.location = "users.html";
    });
}

var profileBtn = document.getElementById('profile-btn');
if (profileBtn != null) {
    profileBtn.addEventListener('touchend', function (ev) {
        window.location = "profile.html";
    });
}

var addEventBtn = document.getElementById('addEvent-btn');
if (addEventBtn != null) {
    addEventBtn.addEventListener('touchend', function (ev) {
        window.location = "addEvent.html";
    });
}
