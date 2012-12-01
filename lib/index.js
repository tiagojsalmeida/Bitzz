/**
 * Bitzz - The Game
 * Created by Tiago Almeida, 2011/2012
 */
 
 
var som_geral = true;
var color = "black";
var color_cont = 0;
var checkpoint_cookie;
var level_id;
var level_time;
var initialLevel;
var username_player;
var timer_score;
var timer_score_cont = 0;
var lvl_id = new Array();
var url = window.location.search;
url_split = url.split("?");
var highscore = url_split[1]
var highscore2 = url_split[2]
var score_player = url_split[3]
var level_id2 = url_split[4]
var level_time2 = url_split[5]

for (var ii = 0; ii <= 14; ii++) {
    lvl_id[ii] = url_split[6 + ii]
}
if (lvl_id[2] == undefined) {
    for (var ii = 0; ii <= 14; ii++) {
        lvl_id[ii] = "0"
    }
}

function onLoadInit(){

    if(highscore=='true'){
        $('#final').show();
    }

    if(highscore2=='true'){
        $('#loader').show();
        $('#enter_highscore').hide();
        $('#highscore').show();

        timer_score = setInterval('timerscore()', 100);

    }else{
        $('#menu_init').show();
        $('#menu').show();
    }
}


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

level_id = getCookie("level_id");
level_time = getCookie("level_time");
window.focus();


/*
If user press [ENTER] -keycode is 13
test if the password is correct
--FOR PASSWORD MENU ONLY--
 */
document.onkeyup = processKey;
function processKey(evt) {
    var keyID;
    if (window.event) {
        keyID = window.event.keyCode

    } else if (evt.which) {
        keyID = evt.which

    }
    if (keyID == 13) {
        menuclick(7)
    }

}

/*
 Reset Cookies and start new game
 */
function newGame(){
    document.cookie = 'level_time=' + "0" + '; expires=Thu, 2 Aug 2022 20:47:11 UTC; path=/';
    document.cookie = 'level_id=' + "01" + '; expires=Thu, 2 Aug 2022 20:47:11 UTC; path=/';
    level_time2 = 0;
    level_id2 = "01";
    playGame(2);
}

/*
Function for all the menu button clicks
 */
function menuclick(id) {

    if (id == 0) { //back to menu
        $('#menu').show();
        $('#menu_init').show();
        $('#highscore').hide();
        $('#enter_highscore').hide();
        $('#menu2').hide();
        $('#password').hide();
        $('#settings').hide();
        $('#instructions').hide();
        $('#back_menu').hide();
        $('#select_level').hide();
    }
    if (id == 1) { //play
        if (parseInt(level_id) > 1 || level_id2 >= 1) {
            $('#menu').hide();
            $('#menu2').show();
            $('#back_menu').show();
        } else {
            /*
           Start new game
             */
            newGame();
        }
    }
    if (id == 2) { //instructions menu
        $('#back_menu').show();
        $('#menu').hide();
        $('#instructions').show();
    }
    if (id == 3) { //password menu
        $('#back_menu').show();
        $('#menu').hide();
        $('#password').show();
        $('#enterpass').focus();
    }
    if (id == 4) { //settings menu
        $('#back_menu').show();
        $('#menu').hide();
        $('#settings').show();
    }
    if (id == 5) { //continue game menu2
        playGame(1);
    }
    if (id == 6) { //new game menu2
        newGame();
    }
    if (id == 7) { //test password
        decrypt( $('#enterpass').val() );
    }
    if (id == 8) { //sound setting
        for (var i = 0; i <= 0; i++) {
            if (som_geral) {
                $('#sound').attr('src', "data/img/sound2.png");
                $('#background_music').html();
                som_geral = false;
                break;
            }
            if (!som_geral) {
                $('#sound').attr('src', "data/img/sound.png");
                $('#background_music').html("<audio autoplay loop><source src='data/audio/background_music.ogg' type='audio/ogg'><source src='data/audio/background_music.mp3' type='audio/mp3'></audio>");
                som_geral = true;
                break;
            }
        }
    }
    if (id == 10) { //Credits
        $('#back_menu').show();
        $('#menu').hide();
    }
    if (id == 11) { //Highscore
        $('#loader').show();
        $('#enter_highscore').hide();
        $('#highscore').show();

        timerscore();
    }
    if (id == 12) { //Select Level
        $('#select_level').show();

        if (level_id != undefined) {
            for (var i = 1; i <= 15; i++) {
                if (i >= 10) {
                    var score_time = getCookie("level_" + i);
                } else {
                    var score_time = getCookie("level_0" + i);
                }
                if (i == 1) {
                    score_time = 0
                }
                var tempo_final = new Date(Number(score_time))
                var milisec = tempo_final.getMilliseconds()
                var sec = tempo_final.getSeconds()
                var min = tempo_final.getMinutes()
                var hour = tempo_final.getHours()
                var score_final = hour + ":" + min + ":" + sec + ":" + milisec
                if (i == 1 || score_time != undefined) {
                    document.getElementById("select_level" + i).src = "data/img/select" + i + ".png"
                    document.getElementById("select_level" + i).setAttribute('onclick', 'selectlvl(' + i + "," + score_time + ');')
                    document.getElementById("select_level").innerHTML += "<div id='selectlevel" + i + "' onclick='selectlvl(" + i + "," + score_time + ");' onkeypress='return false;' >" + score_final + "</div>"
                }
            }
        } else {

            for (var i = 1; i <= 15; i++) {
                var score_time = lvl_id[i - 1]
                var tempo_final = new Date(Number(score_time))
                var milisec = tempo_final.getMilliseconds()
                var sec = tempo_final.getSeconds()
                var min = tempo_final.getMinutes()
                var hour = tempo_final.getHours()
                var score_final = hour + ":" + min + ":" + sec + ":" + milisec
                if (score_time > 0 || i == 1) {
                    document.getElementById("select_level" + i).src = "data/img/select" + i + ".png"
                    document.getElementById("select_level" + i).setAttribute('onclick', 'selectlvl2(' + i + "," + score_time + ');')
                    document.getElementById("select_level").innerHTML += "<div id='selectlevel2" + i + "' onclick='selectlvl(" + i + "," + score_time + ");' onkeypress='return false;' >" + score_final + "</div>"
                }
            }
        }
    }
    if (id == 9) { //color setting
        color_cont++;
        if (color_cont == 6) {
            color_cont = 0
        }
        if (color_cont == 0) {
            color = "black";
        }
        if (color_cont == 1) {
            color = "blue";
        }
        if (color_cont == 2) {
            color = "orange";
        }
        if (color_cont == 3) {
            color = "pink";
        }
        if (color_cont == 4) {
            color = "purple";
        }
        if (color_cont == 5) {
            color = "red";
        }

        $('#color').attr('src', "data/img/" + color + ".png");
        $('#player').attr('src', "data/img/player_" + color + ".png");

    }
    if (som_geral) {
        $('#music').html("<audio autoplay><source src='data/audio/jump.ogg' type='audio/ogg'><source src='data/audio/jump.mp3' type='audio/mp3'></audio>");
    }

}

function selectlvl(id, time) {
    if (id < 10) {
        document.cookie = 'level_id=0' + id + '; expires=Thu, 2 Aug 2022 20:47:11 UTC; path=/';
    } else {
        document.cookie = 'level_id=' + id + '; expires=Thu, 2 Aug 2022 20:47:11 UTC; path=/';
    }
    document.cookie = 'level_time=' + time + '; expires=Thu, 2 Aug 2022 20:47:11 UTC; path=/';

    playGame(1)
}

function selectlvl2(id, time) {
    if (id < 10) {
        level_id2 = "0" + id
    } else {
        level_id2 = id
    }
    level_time2 = time;
    playGame(1)
}

function playGame(x) {
    if (x == 1) {
        if (level_id2 == 16) {
            level_id2 = 15;
            level_time2 = lvl_id[14];
        }
        document.location = "game.html?" + som_geral + "?" + color + "?" + level_id2 + "?" + level_time2 + "?0?" + lvl_id.join("?")
    }
    if (x == 2) {
        $('#intro1').show();
    }
    if (x == 3) {
        $('#intro1').hide();
        $('#intro2').show();
    }
    if (x == 4) {
        $('#intro2').hide();
        $('#intro3').show();
    }
    if (x == 5) {
        $('#intro3').hide();
        $('#intro4').show();
    }
    if (x == 6) {
        $('#intro4').hide();
        $('#intro5').show();
    }

}


function testname() {
    if (som_geral) {
        $("#music").html( "<audio autoplay><source src='data/audio/jump.ogg' type='audio/ogg'><source src='data/audio/jump.mp3' type='audio/mp3'></audio>");
    }

    var input_name = $('#name').val();

    if (input_name != "") {
        username_player = input_name;
        $('#loader').show();
        createScore();
    } else {
        scoreError();
    }


}

/*
Get Timeout after 10 seconds if score isn't loaded
 */
function timerscore() {
    timer_score_cont++;

    if (timer_score_cont == 1) {

        seeScore();

    } else if (timer_score_cont >= 2) {
        if ($('#score10').val() !== "Score 10") {

            $('#loader').hide();
            clearInterval(timer_score);

        } else if ( $('#score10').val() == "Score 10" && timer_score_cont >= 100 /* 10 seconds because setinverval is 100 */) {

            $('#timeout').show();
            clearInterval(timer_score);

        }
    }
}

/*
Display Username Error
 */
function scoreError() {
    $('#loader').hide();
    $('#entername').attr('src',"data/img/entername_error.png");
}



function resetHighscore() {
    /*
     When users finish the map, get the result ans find his position
     */

    var playerPos = 0;
    $.post('scoreoid_proxy.php', {
        action: 'curl_request',
        method: 'getScores',
        response: 'xml',
        order_by: 'score',
        order: 'asc',
        limit: '9999999'
    }, function(data) {

        /*
         This Ajax request returns XML data with all the highscores.
         With this data, I parse every player and check if that username is the username of the user.
         If it is, display an alert with this position.
         */
        $(data).find("player").each(function() {
            playerPos++;
            if($(this).attr('username') == username_player){
                var tempo = $(this).find("score").attr('score')
                var tempo_final = new Date(Number(tempo))
                var milisec = tempo_final.getMilliseconds()
                var sec = tempo_final.getSeconds()
                var min = tempo_final.getMinutes()
                var hour = tempo_final.getHours()
                var score_final = hour + ":" + min + ":" + sec + ":" + milisec
                alert('You are in the '+playerPos+'th position with ' + score_final + ' seconds!');

                url_split[1] = "false"
                url_split[2] = "true"
                url = url_split.join("?")
                document.location = "index.html" + url;
            }
        });

    });
}

/*
Create user score
 */
function createScore() {

    /*
    It's impossible to have score lower than 120000
    If user gets it, he hacks!
     */

    if(score_player>120000){
        $.post('scoreoid_proxy.php', {
            action: 'curl_request',
            method: 'createPlayer',
            response: 'xml',
            username: username_player,
            score: score_player
        }, function(data) {
            var error = data.indexOf("A player with that username already exists");
            if (error >= 0) {
                scoreError();
            } else {
                resetHighscore();
            }
        });

    } else {
        alert('I see you found a bug/glitch. Please contact tjsa@ua.pt about it.');
        url_split[1] = "false"
        url_split[2] = "true"
        url = url_split.join("?")
        document.location = "index.html" + url;
    }
}


var playercont = 0
var scorecont = 0


/*
Display all scores in table
 */
function seeScore() {

    $.post('scoreoid_proxy.php', {
        action: 'curl_request',
        method: 'getBestScores',
        response: 'xml',
        order_by: 'score',
        order: "asc",
        limit: "10"
    }, function(data) {
        $(data).find("player").each(function() {
            playercont++;
            $('#name' + playercont).val($(this).attr('username'));
            $(this).find("score").each(function() {
                scorecont++
                var tempo = $(this).attr('score')
                var tempo_final = new Date(Number(tempo))
                var milisec = tempo_final.getMilliseconds()
                var sec = tempo_final.getSeconds()
                var min = tempo_final.getMinutes()
                var hour = tempo_final.getHours()
                var score_final = hour + ":" + min + ":" + sec + ":" + milisec

                $('#score' + scorecont).val(score_final);
            });
        });
        $('#loader').hide();
    });
}




