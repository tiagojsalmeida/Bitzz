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
		(É)
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


See also the source code on `/lib/melonJS-0.9.2-min,js`.