let ul = document.querySelector ('.nav-list-ul')
let menuBtn = document.querySelector ('.menu-btn i')
let links = document.querySelectorAll ('.nav-list .nave')

function menuShow () {
    if (ul.classList.contains('open')) {
        ul.classList.remove ('open');
    } else {
        ul.classList.add ('open');
    }
}

links.forEach (function (link){
    link.addEventListener('click', function (){
        if (ul.classList.contains ('open')){
            ul.classList.remove ('open');
        }
    })
})

//CHANGE THEME

let color = "dark";

function changeTheme () {
    document.body.classList.toggle(color)
    if (document.body.classList.contains(color)) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

function loadPage () {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        document.body.classList.add (color);
    } else {
        document.body.classList.remove (color);
    }
}

loadPage();

// ANIMATION TECHNOLOGIES

document.addEventListener ("DOMContentLoaded", function () {
    const items = document.querySelectorAll ('.technologies .item');

    const isInView = (el) => {
        const rect = el.getBoundingClientRect ();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        )
    }

    const run = () => {
        items.forEach(item => {
            if (isInView(item)) {
                item.classList.add ('in-view')
            } else {
                item.classList.remove ('in-view');
            }
        })
    }
    window.addEventListener('load', run);
    window.addEventListener ('resize', run);
    window.addEventListener ('scroll', run);
})

//LANYARD
const Lanyard = {
    URL: {
        API: "https://api.lanyard.rest/v1/users/",
        AVATAR: "https://cdn.discordapp.com/avatars/",
        AVATAR_EXT: ".jpg",
        AVATAR_SIZE: "256"
    },
    ID: "302403037228564480",
    IDs: {
        NICKNAME: "nickname",
        STATUS: "status",
        AVATAR: "avatar",
        ACTIVITIES: "activities"
    },
    DIV: {
        NICKNAME: "<div class='text-xl -mt-2 mb-2'>",
        STATUS:
            "<span class='rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm bg-indigo-700 status " // Don't close !
    },
    STATUS: {
        ON_DISCORD: " on Discord",
        ONLINE: "Online",
        IDLE: "Idle",
        DND: "Do not disturb",
        OFFLINE: "Offline"
    },
    ACTIVITIES: {
        CURRENTLY: "I'm on ",
        NOTHING: "I'm currently doing nothing..."
    }
};

let lanyard;
let lanyardUser;
let lanyardActivities;
let statusSpan;

function innerHTML(id, data) {
    document.getElementById(id).innerHTML = data;
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function parseJson(response) {
    return response.json();
}



fetch(Lanyard.URL.API + Lanyard.ID)
    .then(checkStatus)
    .then(parseJson)
    .then(function (data) {
        lanyard = data.data;
        lanyardUser = lanyard.discord_user;
        lanyardActivities = lanyard.activities;

        console.log("Request succeeded", lanyard);

        innerHTML(
            Lanyard.IDs.NICKNAME,
            lanyardUser.global_name +
            "<br>" +
            Lanyard.DIV.NICKNAME +
            " (@" +
            lanyardUser.username +
            ")</div>"
        );

        if (lanyard.discord_status === "online") {
            statusSpan = Lanyard.DIV.STATUS + " online'>";
            innerHTML(
                Lanyard.IDs.STATUS,
                statusSpan +
                Lanyard.STATUS.ONLINE +
                Lanyard.STATUS.ON_DISCORD +
                "</span>"
            );
        } else if (lanyard.discord_status === "idle") {
            statusSpan = Lanyard.DIV.STATUS + " idle'>";
            innerHTML(
                Lanyard.IDs.STATUS,
                statusDiv + Lanyard.STATUS.IDLE + Lanyard.STATUS.ON_DISCORD + "</span>"
            );
        } else if (lanyard.discord_status === "dnd") {
            statusSpan = Lanyard.DIV.STATUS + " dnd'>";
            innerHTML(
                Lanyard.IDs.STATUS,
                statusSpan + Lanyard.STATUS.DND + Lanyard.STATUS.ON_DISCORD + "</div>"
            );
        } else if (lanyard.discord_status === "offline") {
            statusSpan = Lanyard.DIV.STATUS + " offline'>";
            innerHTML(
                Lanyard.IDs.STATUS,
                statusSpan +
                Lanyard.STATUS.OFFLINE +
                Lanyard.STATUS.ON_DISCORD +
                "</span>"
            );
        } else {
            statusSpan = Lanyard.DIV.STATUS + " offline'>";
            innerHTML(
                Lanyard.IDs.STATUS,
                statusSpan +
                Lanyard.STATUS.OFFLINE +
                Lanyard.STATUS.ON_DISCORD +
                "</span>"
            );
        }

        if (lanyardActivities !== null) {
            if (lanyardActivities[0] !== null) {
                innerHTML(
                    Lanyard.IDs.ACTIVITIES,
                    Lanyard.ACTIVITIES.CURRENTLY + lanyardActivities[0].name
                );
            } else {
                innerHTML(Lanyard.IDs.ACTIVITIES, Lanyard.ACTIVITIES.NOTHING);
            }
        } else {
            innerHTML(Lanyard.IDs.ACTIVITIES, Lanyard.ACTIVITIES.NOTHING);
        }
    })
    .catch(function (error) {
        console.log("Request failed", error);
    });