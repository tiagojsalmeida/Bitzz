/**
 * Bitzz - The Game
 * Created by Tiago Almeida, 2011/2012
 */


function getCookie(c_name) {
    /*
     Get value from a cookie:
     SOURCE: http://www.w3schools.com/js/js_cookies.asp
     */
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}

var initialLevel = getCookie("level_id"),
    level_time = getCookie("level_time"),
    checkpoint_cookie,
    url = window.location.search,
    url_split = url.split("?"),
    sound = url_split[1],
    color = url_split[2];

if (initialLevel == undefined || initialLevel == null || initialLevel == "") {
    initialLevel = url_split[3];
    level_time = url_split[4];
}
var lvl_id = new Array();

for (var ii = 0; ii <= 14; ii++) {
    lvl_id[ii] = url_split[6 + ii]
}
var highscore = "false",
    highscore2 = "false",
    time_end = "0",
    swCycleTime = 50,
    swcount = 0,
    sw,
    swObj,
    swct,
    swnow,
    swcycle,
    swObjAry = new Array();

function goHome() {
    var general = "?" + highscore + "?" + highscore2 + "?" + time_end + str_url + "?" + lvl_id.join("?");
    document.cookie = 'general=' + general + '; expires=Thu, 2 Aug 2055 20:47:11 UTC; path=/';
    document.location = "index.html" + general;
}

function swStart(id, ud) {
    swObj = document.getElementById(id);
    swct = swObj.value.split(':');
    swnow = new Date();
    swObj.now = swnow.getTime();
    swObj.reset = level_time;
    if (swcount == 0) {
        swObj.value = level_time;
    }
    swcount++;
    swObj.ud = ud;
    if (!isNaN(swObj.value)) {
        swObj.time = parseInt(swObj.value);
    } else if (swct.length == 4) {
        swObj.time = (swct[0] * 1000 * 60 * 60) + (swct[1] * 1000 * 60) + (swct[2] * 1000) + parseInt(swct[3]);
    } else if (swct.length == 3) {
        swObj.time = (swct[0] * 1000 * 60) + (swct[1] * 1000) + parseInt(swct[2]);
    } else if (swct.length == 2) {
        swObj.time = (swct[0] * 1000) + parseInt(swct[1]);
    } else if (swct.length == 1) {
        swObj.time = parseInt(swct[1]);
    }
    if (!swObj.time) {
        swObj.time = 1;
    }
    if (!swObj.c) {
        swObj.c = ud;
        swObjAry[swObjAry.length] = swObj;
    }
}

function swStop(id) {
    swObj = document.getElementById(id);
    if (!swObj.time) {
        return;
    }
    swObj.time = null;
    sw = new Date().getTime();
    swObj.cycle += (sw - swcycle);
    if (swObj.ud == '-') {
        swObj.cycle -= (sw - swcycle);
        if (swObj.cycle < 0) {
            swObj.cycle = 0;
        }
    }
    swObj.value = (parseInt(swObj.cycle / 1000 / 60 / 60) % 24) + ':' + (parseInt(swObj.cycle / 1000 / 60) % 60) + ':' + ((parseInt((swObj.cycle) / 1000) % 60) + ':' + (swObj.cycle % 1000));
}

function swCycle() {
    swcycle = new Date().getTime();
    for (sw0 = 0; sw0 < swObjAry.length; sw0++) {
        if (swObjAry[sw0].time) {
            swObjAry[sw0].cycle = swObjAry[sw0].time + (swcycle - swObjAry[sw0].now);
            if (swObjAry[sw0].ud == '-') {
                swObjAry[sw0].cycle = swObjAry[sw0].time - (swcycle - swObjAry[sw0].now);
                if (swObjAry[sw0].cycle < 0) {
                    swObjAry[sw0].cycle = 0;
                    swObjAry[sw0].time = 0;
                }
            }
            swObjAry[sw0].value = (parseInt(swObjAry[sw0].cycle / 1000 / 60 / 60) % 24) + ':' + (parseInt(swObjAry[sw0].cycle / 1000 / 60) % 60) + ':' + ((parseInt((swObjAry[sw0].cycle) / 1000) % 60) + ':' + (swObjAry[sw0].cycle % 1000));
        }
    }
}

function swReset(id) {
    swObj = document.getElementById(id);
    swObj.value = swObj.reset;
    swObj.time = null;
}

setInterval('swCycle()', swCycleTime);
