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



See also the source of `/lib/melonJS-0.9.2-min,js`.