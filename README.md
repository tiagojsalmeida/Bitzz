Bitzz - The Game
================
<h4>Created by Tiago Almeida with MelonJS and Scoreoid</h4>

<br>
Game Objective:<br>
   - Be fast and reach the black portal;<br>
   - Avoid die;<br>
   - Enjoy as well.<br>
<br>

Features:<br>
   - Tested and working on [Mozilla Firefox](http://www.mozilla.org/en-US/firefox/new/), [Google Chrome](http://www.google.co.jp/chrome/) and [Safari](http://www.apple.com/safari/);<br>
   - Excellent physics on game (using [MelonJS](http://www.melonjs.org));<br>
   - Highscore with top10 best times (using [Scoreoid](http://www.scoreoid.net)
);<br>
   - Passwords encrypted (using [jsencryption](http://www.vincentcheung.ca/jsencryption/))<br>
   - Added some extras/cheats<br>



JavaScript Code
-------

<h4>Modified code from minified version 0.9.2 of MelonJS</h4>


This code enables enter key to pause/resume game and time.

        document.onkeyup = processKey;
			function processKey(evt) {
				var keyID;
				if (window.event) {
					keyID = window.event.keyCode
					
				} else if (evt.which) {
					keyID = evt.which
				}
				if (keyID == 13) {
					for (var i = 0; i <= 0; i++) {
						if (PauseOn) {
							v.resume(true);
							PauseOn = false;
							swStart('beg2', '+')
							 break;
						}
						if (!PauseOn) {
							v.pause(true);
							PauseOn = true;
							me.state.onPause();
							swStop('beg2')
							 break;
						}
					}
				}
			}

This code saves level and corresponding time in both cookies and string. Also clear all the checkpoint id's and positions.

	LevelEntity = InvisibleEntity.extend({
		(...)
		onCollision: function() {
			var currentlevel = this.gotolevel;
			currentlevel = currentlevel.slice( - 2);
		    document.cookie = 'level_time=' + swObj.cycle + '; expires=Thu, 2 Aug 2022 20:47:11 UTC; path=/';
            document.cookie = 'level_id=' + currentlevel + '; expires=Thu, 2 Aug 2022 20:47:11 UTC; path=/';
			document.cookie = 'level_' + currentlevel + '=' + swObj.cycle + '; expires=Thu, 2 Aug 2022 20:47:11 UTC; path=/';
			str_url="?"+currentlevel+"?"+ swObj.cycle
			lvl_id[currentlevel-1]=swObj.cycle
			for (var i = 1; i <= checkpoint_array.length; i++) {
				checkpoint_array.pop();
				checkpointx_array.pop();
				checkpointy_array.pop();
			}
			this.goTo()			
		}
		
	});


This code let the player jump higher while holing jump key after jumping.

		h.isKeyPressed = function(r) {
			if (k[r]) {
				if (n[r]) {
					d[r] = false;
					k[r] = true
					
				}
				return true
				
			}
			return false
			
		};


This code changes the initial loading for a custom loading.

	var a = me.ScreenObject.extend({
		(...)
		draw: function(d) {
			var f = d.canvas.height / 2;
			me.video.clearSurface(d, "black");
			f += 40;
			var e = Math.floor(this.loadPercent * d.canvas.width);
			document.getElementById('rungif').style.left = e - 40 + 'px';
			document.getElementById('rungif').style.top = f - 32 + 'px';
			d.fillStyle = "white";
			d.fillRect(2, f - 10, e - 4, 32)
		}
	});

See also the source code on `/lib/melonJS-0.9.2-min.js`.


<h4>Code from main.js for creating game.</h4>


This code create the secondary parallax movement between player and background.

var PlayerEntity = me.ObjectEntity.extend({
	(...)
    update: function() {
            updated = this.updateMovement();
            if (this.pos.x >= 200) {
                me.game.viewport.move(5, 0)
            }
}


This code saves all the checkpoints id's and positions when loading all objects, and onCollision, verify which checkpoint was touched and saves his id in a string ( same logic applies to Teleport object ).

}
var Checkpoint = me.CollectableEntity.extend({
    init: function(a, c, b) {
        (...)
        checkpoint_array[b.id] = b.id;
        checkpointx_array[b.id] = a;
        checkpointy_array[b.id] = c - 50;

    },
    onCollision: function(res, obj) {
        me.audio.play("checkpoint");
        for (var i = 1; i <= checkpoint_array.length; i++) {
            if ((obj.pos.x - 100 <= checkpointx_array[i]) && (obj.pos.x + 100 >= checkpointx_array[i])) {
                checkpoint_cookie = i;
                this.setCurrentAnimation("check");
            }
        }
        this.collidable = false;
    }
}


See also the source code on `/lib/main.js`.



<h4>Code to get Cookies Value.</h4>

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

(From http://www.w3schools.com/js/js_cookies.asp)



<h4>Code of Encrypted Passwords.</h4>

{
var uHkFhgqX327T = new Array()
uHkFhgqX327T[0] = "U2FsdGVkX1+MZbAVTEHRugL7SpE66bSvnExmyhC5NZk=";
uHkFhgqX327T[1] = "U2FsdGVkX1+MZbAVTEHRugL7SpE66bSvnExmyhC5NZk=";
uHkFhgqX327T[2] = "U2FsdGVkX195m3FTi8t4DQ3OcHJvhiKOiMhRd5Z+2aU=";
uHkFhgqX327T[3] = "U2FsdGVkX19CMkvDIAMVXb/CAXtSQS1pRQufOcd5uPM=";
uHkFhgqX327T[4] = "U2FsdGVkX1/hLEhlgdfgnEGCtR7aVMx30vvU1LVHJXE=";
uHkFhgqX327T[5] = "U2FsdGVkX1+F3ayq3IhCBFY2XTRmaQcRfgZai8GeBJ0=";
uHkFhgqX327T[6] = "U2FsdGVkX19tSvGaFxOP+R6rKrLuhSf0YwLKcJUM9EM=";
uHkFhgqX327T[7] = "U2FsdGVkX1/osCbqoWvJhx12bxeGENVAumXvfGUuUVk=";
uHkFhgqX327T[8] = "U2FsdGVkX1/0vVGWfv0A/Tou7gCQV/PKZXYge+jKwow=";
uHkFhgqX327T[9] = "U2FsdGVkX18L9EJ7HwjFLUTWG2v0ITME/yPNkZW71IU=";
uHkFhgqX327T[10] = "U2FsdGVkX1+MulZnfjk2vGS0cM5cE63q5yFqCQuQi+g=";
uHkFhgqX327T[11] = "U2FsdGVkX19RmLIt+RcUGkiR7RTgbOkwKgvMJ1ugVDI=";
uHkFhgqX327T[12] = "U2FsdGVkX1/jJHoue8B7kNL2kM42BBDDyOe0BX+PDGo=";
uHkFhgqX327T[13] = "U2FsdGVkX1/ZG3LmYnKl8Kv8emv10uJYTl5RN6ati6Q=";
uHkFhgqX327T[14] = "U2FsdGVkX1/WIZn0r1dKXNnSrDbtnzTLwyDk/CV+yfE=";
uHkFhgqX327T[15] = "U2FsdGVkX19W4F7vwtcZEaCwTqRyI2zorqycx/i7hMM=";
uHkFhgqX327T[16] = "U2FsdGVkX1+aLtpf0dcKINpc+GGAtLn3ri9sP3/9nXc=";
}

See also the source code on `/lib/jsencryption.js`.



<h4>Code for call and get response from Scoreoid</h4>


This code calls createPlayer function of Scoreoid for creating an user with his corresponding score (time).

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


This code parses the XML response from Scoreoid with top 10 highscores and corresponding usernames, and display them on corresponding inputs.

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


See also the source code on `/lib/index.js`.

