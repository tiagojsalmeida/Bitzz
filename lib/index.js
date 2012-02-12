/**
 * Bitzz - The Game
 * Created by Tiago Almeida, 2011/2012
 */
 
 
var som_geral = true;
var color = "black";
var color_cont = 0;
var checkpoint_cookie;
var level_id;
var level_id2;
var level_time;
var level_time2;
var initialLevel;
var input_pass;
var username_player;
var score_player;
var timer_score;
var timer_score_cont = 0;
var lvl_id = new Array();
var lvl_time = new Array();
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

function resetHighscore() {
    url_split[1] = "false"
    url_split[2] = "true"
    url = url_split.join("?")
    document.location = "index.html" + url;
}

function getCookie(c_name) {
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
level_time = getCookie("level_time")
window.focus()


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
function menuclick(id) {

    if (id == 0) { //back to menu
        document.getElementById("menu").style.display = "block";
        document.getElementById("menu_init").style.display = "block";
        document.getElementById("highscore").style.display = "none";
        document.getElementById("enter_highscore").style.display = "none";
        document.getElementById("menu2").style.display = "none";
        document.getElementById("password").style.display = "none";
        document.getElementById("settings").style.display = "none";
        document.getElementById("instructions").style.display = "none";
        document.getElementById("back_menu").style.display = "none";
        document.getElementById("credits").style.display = "none";
        document.getElementById("select_level").style.display = "none";
    }
    if (id == 1) { //play
        if (parseInt(level_id) > 1 || level_id2 >= 1) {
            document.getElementById("menu").style.display = "none";
            document.getElementById("menu2").style.display = "block";
            document.getElementById("back_menu").style.display = "block";

        } else {
            document.cookie = 'level_time=' + "0" + '; expires=Thu, 2 Aug 2022 20:47:11 UTC; path=/';
            document.cookie = 'level_id=' + "01" + '; expires=Thu, 2 Aug 2022 20:47:11 UTC; path=/';
            level_time2 = 0;
            level_id2 = "01"
            playGame(2);
        }
    }
    if (id == 2) { //instructions menu
        document.getElementById("back_menu").style.display = "block";
        document.getElementById("menu").style.display = "none";
        document.getElementById("instructions").style.display = "block";
    }
    if (id == 3) { //password menu
        document.getElementById("back_menu").style.display = "block";
        document.getElementById("menu").style.display = "none";
        document.getElementById("password").style.display = "block";
        document.getElementById("enterpass").focus();
    }
    if (id == 4) { //settings menu
        document.getElementById("back_menu").style.display = "block";
        document.getElementById("menu").style.display = "none";
        document.getElementById("settings").style.display = "block";
    }
    if (id == 5) { //continue game menu2
        playGame(1);
    }
    if (id == 6) { //new game menu2
        document.cookie = 'level_time=' + "0" + '; expires=Thu, 2 Aug 2022 20:47:11 UTC; path=/';
        document.cookie = 'level_id=' + "01" + '; expires=Thu, 2 Aug 2022 20:47:11 UTC; path=/';
        level_time2 = 0;
        level_id2 = "01"
        playGame(2);

    }
    if (id == 7) { //test password
        input_pass = document.getElementById("enterpass").value;
        decrypt(input_pass)
    }
    if (id == 8) { //sound setting
        for (var i = 0; i <= 0; i++) {
            if (som_geral) {
                document.getElementById("sound").src = "data/img/sound2.png";
                document.getElementById("background_music").innerHTML = "";
                som_geral = false;
                break;
            }
            if (!som_geral) {
                document.getElementById("sound").src = "data/img/sound.png";
                document.getElementById("background_music").innerHTML = "<audio autoplay loop><source src='data/audio/background_music.ogg' type='audio/ogg'><source src='data/audio/background_music.mp3' type='audio/mp3'></audio>"
                som_geral = true;
                break;
            }
        }
    }
    if (id == 10) { //Credits
        document.getElementById("back_menu").style.display = "block";
        document.getElementById("menu").style.display = "none";
        document.getElementById("credits").style.display = "block";
    }
    if (id == 11) { //Highscore
        document.getElementById("loader").style.display = "block";
        scoreError(0)
    }
    if (id == 12) { //Select Level
        document.getElementById("select_level").style.display = "block";

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
            document.getElementById("color").src = "data/img/" + color + ".png";
            document.getElementById("player").src = "data/img/player_" + color + ".png"
        }
        if (color_cont == 1) {
            color = "blue";
            document.getElementById("color").src = "data/img/" + color + ".png";
            document.getElementById("player").src = "data/img/player_" + color + ".png"
        }
        if (color_cont == 2) {
            color = "orange";
            document.getElementById("color").src = "data/img/" + color + ".png";
            document.getElementById("player").src = "data/img/player_" + color + ".png"
        }
        if (color_cont == 3) {
            color = "pink";
            document.getElementById("color").src = "data/img/" + color + ".png";
            document.getElementById("player").src = "data/img/player_" + color + ".png"
        }
        if (color_cont == 4) {
            color = "purple";
            document.getElementById("color").src = "data/img/" + color + ".png";
            document.getElementById("player").src = "data/img/player_" + color + ".png"
        }
        if (color_cont == 5) {
            color = "red";
            document.getElementById("color").src = "data/img/" + color + ".png";
            document.getElementById("player").src = "data/img/player_" + color + ".png"
        }

    }
    if (som_geral) {
        document.getElementById("music").innerHTML = "<audio autoplay><source src='data/audio/jump.ogg' type='audio/ogg'><source src='data/audio/jump.mp3' type='audio/mp3'></audio>"
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
        document.getElementById("intro1").style.display = "block";
    }
    if (x == 3) {
        document.getElementById("intro1").style.display = "none";
        document.getElementById("intro2").style.display = "block";
    }
    if (x == 4) {
        document.getElementById("intro2").style.display = "none";
        document.getElementById("intro3").style.display = "block";
    }
    if (x == 5) {
        document.getElementById("intro3").style.display = "none";
        document.getElementById("intro4").style.display = "block";
    }
    if (x == 6) {
        document.getElementById("intro4").style.display = "none";
        document.getElementById("intro5").style.display = "block";
    }

}


function testname() {
    if (som_geral) {
        document.getElementById("music").innerHTML = "<audio autoplay><source src='data/audio/jump.ogg' type='audio/ogg'><source src='data/audio/jump.mp3' type='audio/mp3'></audio>"
    }
    var input_name = document.getElementById("name").value;
    if (input_name !== "") {
        username_player = input_name;
        document.getElementById("loader").style.display = "block";
        createScore2();
    }


}

function timerscore() {
    timer_score_cont++
    if (timer_score_cont == 1) {
        seeScore();
    } else if (timer_score_cont >= 2) {
        if (document.getElementById("score10").value !== "Score 10") {
            document.getElementById("loader").style.display = "none";
            clearInterval(timer_score)
        } else if (document.getElementById("score10").value == "Score 10" && timer_score_cont >= 100) {
            document.getElementById("timeout").style.display = "block";
            clearInterval(timer_score)
        }
    }
}

function scoreError(x) {
    if (x == 0) {
        resetHighscore();
    }
    if (x == 1) {
        document.getElementById("loader").style.display = "none";
        document.getElementById("entername").src = "data/img/entername_error.png";
    }

}


function createScore2() {
    $.post('scoreoid_proxy.php', {
        action: 'curl_request',
        method: 'createPlayer',
        response: 'xml',
        username: username_player,
        score: score_player
    }, function(data) {
        console.log("Data Loaded: " + data);
        var error = data.indexOf("A player with that username already exists");
        if (error >= 0) {
            scoreError(1)
        } else {
            scoreError(0)
        }
    });
}


var playercont = 0
var scorecont = 0

function seeScore() {
    $.post('scoreoid_proxy.php', {
        action: 'curl_request',
        method: 'getBestScores',
        response: 'xml',
        order_by: 'score',
        order: "asc",
        limit: "10"
    }, function(data) {
        //     alert("Data Loaded: " + data);
        console.log("Data Loaded: " + data);
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
    });
}
