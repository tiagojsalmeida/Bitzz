/**
 * Bitzz - The Game
 * Created by Tiago Almeida, 2011/2012
 */


var checkpoint_array = new Array();
var checkpointx_array = new Array();
var checkpointy_array = new Array();
var teleport_array = new Array();
var teleportx_array = new Array();
var teleporty_array = new Array();
var speed = false;
var invisibility = false;
var g_ressources = [{
    name: "tileset",
    type: "image",
    src: "data/tileset/tileset.png"
}, {
    name: "level01",
    type: "tmx",
    src: "data/level01.tmx"
}, {
    name: "level02",
    type: "tmx",
    src: "data/level02.tmx"
}, {
    name: "level03",
    type: "tmx",
    src: "data/level03.tmx"
}, {
    name: "level04",
    type: "tmx",
    src: "data/level04.tmx"
}, {
    name: "level05",
    type: "tmx",
    src: "data/level05.tmx"
}, {
    name: "level06",
    type: "tmx",
    src: "data/level06.tmx"
}, {
    name: "level07",
    type: "tmx",
    src: "data/level07.tmx"
}, {
    name: "level08",
    type: "tmx",
    src: "data/level08.tmx"
}, {
    name: "level09",
    type: "tmx",
    src: "data/level09.tmx"
}, {
    name: "level10",
    type: "tmx",
    src: "data/level10.tmx"
}, {
    name: "level11",
    type: "tmx",
    src: "data/level11.tmx"
}, {
    name: "level12",
    type: "tmx",
    src: "data/level12.tmx"
}, {
    name: "level13",
    type: "tmx",
    src: "data/level13.tmx"
}, {
    name: "level14",
    type: "tmx",
    src: "data/level14.tmx"
}, {
    name: "level15",
    type: "tmx",
    src: "data/level15.tmx"
}, {
    name: "level16",
    type: "tmx",
    src: "data/level16.tmx"
}, {
    name: "gripe_run_right",
    type: "image",
    src: "data/sprite/gripe_run_right_" + color + ".png"
}, {
    name: "jump",
    type: "image",
    src: "data/sprite/jump.png"
}, {
    name: "jump_up",
    type: "image",
    src: "data/sprite/jump_up.png"
}, {
    name: "parallax",
    type: "image",
    src: "data/parallax/parallax.png"
}, {
    name: "collect",
    type: "image",
    src: "data/sprite/collect.png"
}, {
    name: "32x32_font",
    type: "image",
    src: "data/sprite/32x32_font2.png"
}, {
    name: "none",
    type: "image",
    src: "data/sprite/none.png"
}, {
    name: "saw",
    type: "image",
    src: "data/sprite/spin.png"
}, {
    name: "saw2",
    type: "image",
    src: "data/sprite/spin2.png"
}, {
    name: "move62",
    type: "image",
    src: "data/sprite/move62.png"
}, {
    name: "move42",
    type: "image",
    src: "data/sprite/move42.png"
}, {
    name: "move41",
    type: "image",
    src: "data/sprite/move41.png"
}, {
    name: "speed_right",
    type: "image",
    src: "data/sprite/speed_right_32.png"
}, {
    name: "speed_left",
    type: "image",
    src: "data/sprite/speed_left_32.png"
}, {
    name: "teleport_img",
    type: "image",
    src: "data/sprite/teleport_img.png"
}, {
    name: "spike",
    type: "image",
    src: "data/sprite/spike.png"
}, {
    name: "check",
    type: "image",
    src: "data/sprite/check.png"
}, {
    name: "visible",
    type: "image",
    src: "data/sprite/visible.png"
}, {
    name: "invisible",
    type: "image",
    src: "data/sprite/invisible.png"
}, {
    name: "portal",
    type: "image",
    src: "data/sprite/portal.png"
}, {
    name: "portal2",
    type: "image",
    src: "data/sprite/portal2.png"
}, {
    name: "background_music",
    type: "audio",
    src: "./data/audio/",
    channel: 2
}, {
    name: "die",
    type: "audio",
    src: "./data/audio/",
    channel: 2
}, {
    name: "collect",
    type: "audio",
    src: "./data/audio/",
    channel: 2
}, {
    name: "jump",
    type: "audio",
    src: "./data/audio/",
    channel: 2
}, {
    name: "checkpoint",
    type: "audio",
    src: "./data/audio/",
    channel: 2
}, {
    name: "wrong",
    type: "audio",
    src: "./data/audio/",
    channel: 2
}];

var jsApp = {
    version: "1.4",
    objRef: null,
    onload: function() {
        me.sys.fps = 60;
        if (!me.video.init("jsapp", 700, 480)) {
            alert("Sorry but your browser does not support Html5. Please try another one!");
            return
        }
        me.audio.init("mp3,ogg");
        me.loader.onload = this.loaded.bind(this);
        me.loader.preload(g_ressources);
        me.state.change(me.state.LOADING)
    },

    loaded: function() {
        me.state.set(me.state.PLAY, new PlayScreen());
        me.entityPool.add("mainPlayer", PlayerEntity);
        me.entityPool.add("CollectEntity", CollectEntity);
        me.entityPool.add("HurtEntity", HurtEntity);
        me.entityPool.add("SawEntity", SawEntity);
        me.entityPool.add("MoveEntity", MoveEntity);
        me.entityPool.add("MoveEntity2", MoveEntity2);
        me.entityPool.add("Spike", Spike);
        me.entityPool.add("SpikeAuto", SpikeAuto);
        me.entityPool.add("SpikeTrigger", SpikeTrigger);
        me.entityPool.add("SpeedEntity", SpeedEntity);
        me.entityPool.add("JumpEntity", JumpEntity);
        me.entityPool.add("JumpEntity2", JumpEntity2);
        me.entityPool.add("Checkpoint", Checkpoint);
        me.entityPool.add("Teleport", Teleport);
        me.entityPool.add("Visible", Visible);
        me.entityPool.add("Invisible", Invisible);
        me.entityPool.add("StartCount", StartCount);
        me.entityPool.add("EndCount", EndCount);
        me.entityPool.add("Initial", Initial);
        me.entityPool.add("InitialBlack", InitialBlack);
        me.entityPool.add("Final", Final);
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.W, "jump", true);
        me.input.bindKey(me.input.KEY.S, "down");
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "jump", true);
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.state.onPause = function() {
            context = me.video.getScreenFrameBuffer();
            context.fillStyle = "rgba(0, 0, 0, 0.9)";
            context.fillRect(0, (me.video.getHeight() / 2) - 100, me.video.getWidth(), 200);
            font = new me.BitmapFont("32x32_font", 24);
            font.set("left");
            measure = font.measureText("P A U S E");
            font.draw(context, "P A U S E", (me.video.getWidth() / 2) - (measure.width / 2), (me.video.getHeight() / 2) - (measure.height / 2))
        };
        me.state.change(me.state.PLAY);
        document.getElementById('rungif').style.display = "none";
        document.getElementById('loading').style.display = "none";
    }

};


var PlayScreen = me.ScreenObject.extend({

    onResetEvent: function() {
        me.levelDirector.loadLevel("level" + initialLevel);
        if (sound == "true") {
            me.audio.enable()

        } else if (sound == "false") {
            me.audio.disable()
        }
        me.audio.play("background_music", false, function() {
            me.audio.play("background_music", false, function() {
                me.audio.play("background_music", false, function() {
                    me.audio.play("background_music", false, function() {

                    })
                })
            })
        })
        me.game.sort();

    },
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.UP);
        me.input.unbindKey(me.input.KEY.DOWN);
        me.audio.stopTrack();
    }
});
window.onReady(function() {
    jsApp.onload();
});


var PlayerEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
        for (var i = 1; i <= checkpoint_array.length; i++) {
            if (checkpoint_cookie == i) {
                if (checkpointx_array[checkpoint_cookie] == undefined || checkpointx_array[checkpoint_cookie] == 0) {
                    checkpointx_array[checkpoint_cookie] = 100;
                    checkpointy_array[checkpoint_cookie] = 200;
                }
                this.pos.x = checkpointx_array[checkpoint_cookie]
                this.pos.y = checkpointy_array[checkpoint_cookie]
            }
        }
        this.initialyvel = 13;
        this.initialxvel = 6;
        this.setFriction(0.2, 0.1);
        this.setVelocity(this.initialxvel, this.initialyvel);
        this.addAnimation("stand", [0, 0]);
        this.addAnimation("jump", [1, 1]);
        this.addAnimation("walk", [2, 3, 4]);
        this.addAnimation("slide", [5, 5]);
        this.addAnimation("jump_speed", [6, 6]);
        this.addAnimation("walk_speed", [7, 8, 9]);
        this.addAnimation("invisible_animation", [10, 11, 12]);
        this.addAnimation("invisible_stand", [13, 13]);
        this.addAnimation("invisible_jump", [14, 14]);
        this.addAnimation("invisible_walk", [15, 16, 17]);
        this.addAnimation("invisible_slide", [18, 18]);
        this.addAnimation("visible_animation", [19, 20, 21]);
        this.addAnimation("dead", [22, 22]);
        this.setCurrentAnimation("walk");
        this.onTileBreak = function() {
            me.audio.play("wrong")
        };
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        if (invisibility == true) {
            this.canBreakTile = true;
        }


    },
    update: function() {

        if (!this.alive) {
            this.vel.x = 0;
            updated = this.updateMovement()
        } else {
            if (me.input.isKeyPressed("left") || me.input.isKeyPressed("right")) {
                if (speed == false) {
                    if (invisibility == true) {
                        this.setCurrentAnimation('invisible_walk')
                    }
                    if (invisibility == false) {
                        this.setCurrentAnimation('walk')
                    }
                    if (me.input.isKeyPressed("left")) {
                        this.doWalk(true)
                        this.vel.x -= this.accel.x * me.timer.tick
                    } else {
                        this.doWalk(false)
                        this.vel.x += this.accel.x * me.timer.tick
                    }
                }
            }


            if (me.input.isKeyPressed("jump")) {
                if (this.doJump()) {
                    me.audio.play("jump");
                }
                if (me.input.isKeyPressed("jump")) {
                    if (this.jumping) {
                        this.pos.y = this.pos.y - 8;
                    }
                }

            }
            if (speed == false) {
                if (me.input.isKeyPressed("down")) {
                    this.slide();
                    this.updateColRect(10, 44, 32, 32);
                }
            }

            updated = this.updateMovement();
            if (this.pos.x >= 200) {
                me.game.viewport.move(5, 0)
            }
            if (!this.isCurrentAnimation("slide")) {
                this.updateColRect(10, 44, 1, 63);

            }
            if (this.isCurrentAnimation("slide")) {
                this.updateColRect(10, 44, 32, 32);

            }


            if ((this.vel.x == 0) && (speed == true)) {
                this.setWalk()
                speed = false
                this.setFriction(0.2, 0.1);
            } else if ((this.vel.y < 0) || (this.vel.y > 0) || (this.falling || this.jumping)) {
                if (speed == false && invisibility == false) {
                    this.setCurrentAnimation('jump')
                }
                if (speed == true) {
                    this.setCurrentAnimation('jump_speed')
                }
                if (invisibility == true) {
                    this.setCurrentAnimation('invisible_jump')
                }
            } else if ((this.vel.x == 0) && !this.jumping && !this.falling) {
                if (invisibility == true) {
                    this.setCurrentAnimation('invisible_stand')
                }
                if (invisibility == false) {
                    this.setCurrentAnimation("stand");
                }
            }


            var a = me.game.collide(this);
            if (a) {
                switch (a.type) {
                case "speed":
                    this.setVelocity(20, this.initialyvel);
                    this.vel.x = 20;
                    this.setFriction(0, 0);
                    speed = true;
                    this.setCurrentAnimation('walk_speed')
                    break;
                case "Invisible":
                    if (invisibility == false) {
                        this.setCurrentAnimation('invisible_animation', "invisible_stand")
                        this.canBreakTile = true;
                    }
                    invisibility = true;
                    break;
                case "Visible":
                    if (invisibility == true) {
                        this.setCurrentAnimation('visible_animation', "stand")
                        this.canBreakTile = false;
                    }
                    invisibility = false;
                    break;
                default:
                    break
                }
            }
            if (updated || !this.isCurrentAnimation("walk")) {
                this.parent();
                updated = true
            }
        }
        return updated
    },
    setWalk: function() {
        this.canBreakTile = false;
        this.setCurrentAnimation("walk");
        this.vel.x = 0;
        this.setVelocity(this.initialxvel, this.initialyvel)

    },
    slide: function() {
        if (invisibility == true) {
            this.setCurrentAnimation("invisible_slide");
        }
        if (invisibility == false) {
            this.setCurrentAnimation("slide");
        }
        this.setVelocity(this.initialxvel, this.initialyvel)
    },
    megaJump: function() {
        me.audio.play("jump");
        if (speed == false) {
            this.setVelocity(this.initialxvel, this.initialyvel * (1.7));
            this.forceJump();
            this.setVelocity(this.initialxvel, this.initialyvel)
        }
        if (speed == true) {
            this.setVelocity(20, this.initialyvel * 2)
            this.forceJump();
            this.setVelocity(20, this.initialyvel)
        }

    },
    die: function() {
        me.audio.play("die");
        swStop("beg2")
        this.alive = false;
        invisibility = false;
        speed = false;
        me.gamestat.reset();
        me.levelDirector.reloadLevel();
        me.game.viewport.fadeOut("#000000", 50);

    }
});

var Checkpoint = me.CollectableEntity.extend({
    init: function(a, c, b) {
        b.image = "check";
        b.spritewidth = 64;
        this.parent(a, c, b);
        this.addAnimation("uncheck", [0, 0]);
        this.addAnimation("check", [1, 1]);
        this.setCurrentAnimation("uncheck");
        this.autodestroy = false;
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
    },
    update: function() {
        updated = this.updateMovement()
        if (updated) {
            this.parent();
            updated = true
        }
        return updated
    }
});


var Teleport = me.CollectableEntity.extend({
    init: function(a, c, b) {
        b.image = "teleport_img";
        b.spritewidth = 64;
        this.parent(a, c, b);
        this.addAnimation("normal", [0, 0]);
        this.addAnimation("active", [1, 2, 3]);
        this.setCurrentAnimation("normal");
        this.autodestroy = false;
        teleport_array[b.id] = b.id;
        teleportx_array[b.id] = a;
        teleporty_array[b.id] = c;
        this.nameid = b.id;
    },
    onCollision: function(res, obj) {
        for (var i = 0; i < (teleportx_array.length);
        (i = i + 2)) {
            if (this.nameid == i) {
                obj.pos.x = teleportx_array[i + 1]
                obj.pos.y = teleporty_array[i + 1]

            }
        }
        this.setCurrentAnimation("active");
    },
    update: function() {
        updated = this.updateMovement()
        if (updated) {
            this.parent();
            updated = true
        }
        return updated
    }
});
var SpeedEntity = me.CollectableEntity.extend({
    init: function(a, c, b) {
        b.image = "speed_right";
        b.spritewidth = 32;
        this.parent(a, c, b);
        this.autodestroy = false;
        this.type = "speed"
    }
});

var Visible = me.CollectableEntity.extend({
    init: function(a, c, b) {
        b.image = "visible";
        b.spritewidth = 32;
        this.parent(a, c, b);
        this.autodestroy = false;
        this.type = "Visible"
    }
});

var Invisible = me.CollectableEntity.extend({
    init: function(a, c, b) {
        b.image = "invisible";
        b.spritewidth = 32;
        this.parent(a, c, b);
        this.autodestroy = false;
        this.type = "Invisible"
    }
});


var SawEntity = me.CollectableEntity.extend({
    init: function(a, c, b) {
        this.parent(a, c, b);
        this.addAnimation("spin", [0, 1, 2, 3, 4, 5, 6, 7]);
        this.setCurrentAnimation("spin");
        this.autodestroy = false;
    }
});


var CollectEntity = me.CollectableEntity.extend({
    init: function(x, y, settings) {
        this.visibility = false;
        this.collidable = true;
        settings.spritewidth = "64";
        settings.width = "1";
        this.parent(x, y, settings);
        this.addAnimation("move", [0, 1, 2, 3, 4, 5]);
        this.addAnimation("collected", [6, 6]);
        this.setCurrentAnimation("move");
    },
    onCollision: function(res, obj) {
        if (res.y > 0 || (res.x < 64 && res.x > 0)) {
            me.audio.play("collect");
            swObj.time = swObj.time - 5000
            this.collidable = false;
            this.setCurrentAnimation("collected");
        }
    }

});


var MoveEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
        this.pos.x = x;
        this.walkLeft = true;
        this.setVelocity(1, 0);
        this.gravity = 0;
        this.collidable = true;
        this.type = me.game.ACTION_OBJECT;
        this.addAnimation("move", [0, 0]);
        this.setCurrentAnimation("move");
    },
    onCollision: function(res, obj) {
        if (obj.alive) {

            if (obj.jumping && res.y < 0) {
                obj.forceJump()
                obj.jumping = false;
                obj.falling = true;

            }
            if (obj.falling) {
                obj.pos.y = this.pos.y - 63;
                obj.vel.y = 0;
                obj.falling = false;
                if (invisibility == true) {
                    obj.setCurrentAnimation('invisible_stand')
                }
                if (invisibility == false) {
                    obj.setCurrentAnimation("stand");
                }

                if (res.y > 0) {
                    if (this.walkLeft) {
                        obj.pos.x = obj.pos.x - 1;
                    }
                    if (!this.walkLeft) {
                        obj.pos.x = obj.pos.x + 1;
                    }
                }

            } else {
                obj.vel.y = initialyvel;
            }

        }
    },
    update: function() {
        if (!this.visible) return false;
        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            this.doWalk(this.walkLeft);
        } else {
            this.vel.x = 0;
        }
        this.updateMovement();
        if (this.vel.x != 0) {
            this.parent(this);
            return true;
        }
        return false;
    }
});


var MoveEntity2 = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.starty = y;
        this.endy = y + settings.height
        this.pos.y = y;
        this.upp = false;
        this.setVelocity(0, 1);
        this.gravity = 0;
        this.collidable = true;
        this.type = me.game.ACTION_OBJECT;
        this.addAnimation("move", [0, 0]);
        this.setCurrentAnimation("move");
    },
    onCollision: function(res, obj) {
        if (obj.alive) {
            if (obj.jumping && res.y < 0) {
                obj.forceJump()
                obj.jumping = false;
                obj.falling = true;
            }
            if (obj.falling) {
                obj.pos.y = this.pos.y - 63;
                obj.vel.y = 0;
                obj.falling = false;
                if (invisibility == true) {
                    obj.setCurrentAnimation('invisible_stand')
                }
                if (invisibility == false) {
                    obj.setCurrentAnimation("stand");
                }
            } else {
                obj.vel.y = initialyvel;
            }

        }
    },
    update: function() {

        if (this.upp) {
            this.vel.y = -1
        }
        if (!this.upp) {
            this.vel.y = 1
        }
        if (this.pos.y >= this.endy) {
            this.upp = true
        }
        if (this.pos.y <= this.starty) {
            this.upp = false
        }
        this.updateMovement();
        if (this.vel.y != 0) {
            this.parent(this);
            return true;
        }
        return false;
    }
});

var trigger = false;
var timer_trigger;
var triggg = 0
var Spike = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.starty = y;
        this.endy = y + settings.height;
        this.pos.y = y;
        this.upp = false;
        this.timeout = 3000;
        this.setVelocity(0, 2);
        if (settings.hard == true) {
            this.setVelocity(0, 4);
            this.timeout = 1000
        }
        this.gravity = 0;
        this.collidable = true;
        this.type = me.game.ACTION_OBJECT;
        this.addAnimation("move", [0, 0]);
        this.setCurrentAnimation("move");
    },
    onCollision: function(res, obj) {
        obj.die()
    },
    update: function() {
        if (trigger == true) {
            this.vel.y = 10
            timer_trigger = setTimeout("trigg()", this.timeout);
        }
        if (trigger == false) {
            this.vel.y = -5
            if (this.pos.y < this.starty) {
                this.vel.y = 0
            }
        }

        this.updateMovement();
        if (this.vel.y != 0) {
            this.parent(this);
            return true;
        }
        return false;
    }
});

function trigg() {
    triggg++;
    if (triggg == 1) {
        trigger = false;
        triggg = 0
        clearTimeout(timer_trigger)
    }
}

var SpikeTrigger = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.collidable = true;
        this.type = me.game.ACTION_OBJECT;
    },
    onCollision: function(res, obj) {
        trigger = true;

    }


});

var SpikeAuto = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.starty = y;
        this.endy = y + settings.height
        this.pos.y = y;
        this.upp = false;
        this.variable = settings.speed;
        this.gravity = 0;
        this.collidable = true;
        this.type = me.game.ACTION_OBJECT;
        this.addAnimation("move", [0, 0]);
        this.setCurrentAnimation("move");
    },
    onCollision: function(res, obj) {
        obj.die()
    },
    update: function() {

        if (this.upp) {
            this.vel.y = -1
        }
        if (!this.upp) {
            this.vel.y = this.variable
        }
        if (this.pos.y >= this.endy) {
            this.upp = true
        }
        if (this.pos.y <= this.starty) {
            this.upp = false
        }
        this.updateMovement();
        if (this.vel.y != 0) {
            this.parent(this);
            return true;
        }
        return false;
    }
});

var JumpEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.collidable = true;
        this.type = me.game.ACTION_OBJECT;
        this.addAnimation("down", [0, 0]);
        this.addAnimation("up", [1, 2]);
        this.setCurrentAnimation("down");
    },
    onCollision: function(res, obj) {

        if (this.alive) {
            obj.megaJump();
            this.setCurrentAnimation("up", "down")

        }
    }


});


var JumpEntity2 = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.collidable = true;
        this.type = me.game.ACTION_OBJECT;
        this.addAnimation("up", [0, 1, 2]);
        this.setCurrentAnimation("up");
    },
    onCollision: function(res, obj) {

        if (this.alive) {
            obj.megaJump();
        }
    }


});

var HurtEntity = me.InvisibleEntity.extend({
    init: function(a, c, b) {
        this.parent(a, c, b);
        this.collidable = true;
        this.visible = true;
        this.type = me.game.ENEMY_OBJECT;
    },
    onCollision: function(a, b) {
        b.die();
    }
});


var StartCount = me.InvisibleEntity.extend({
    init: function(a, c, b) {
        b.image = "none";
        b.spritewidth = "64";
        this.parent(a, c, b);
        this.collidable = true;
    },
    onCollision: function(a, b) {
        swStart('beg2', '+')
        me.game.remove(this)

    }
});


var Initial = me.ObjectEntity.extend({
    init: function(a, c, b) {
        b.image = "portal2";
        b.spritewidth = "96";
        this.parent(a, c, b);
    }
});

var InitialBlack = me.ObjectEntity.extend({
    init: function(a, c, b) {
        b.image = "portal";
        b.spritewidth = "96";
        this.parent(a, c, b);
    }
});

var Final = me.ObjectEntity.extend({
    init: function(a, c, b) {
        b.image = "portal2";
        b.spritewidth = "96";
        this.parent(a, c, b);
    }
});


var EndCount = me.ObjectEntity.extend({
    init: function(a, c, b) {
        b.image = "portal";
        b.spritewidth = "96";
        this.parent(a, c, b);
        this.collidable = true;
    },
    onCollision: function(a, b) {
        swStop('beg2')
        time_end = swObj.cycle;
        highscore = "true";
        level_time = "0"
        level_id = "01"
        document.cookie = 'level_time=' + "0" + '; expires=Thu, 2 Aug 2022 20:47:11 UTC; path=/';
        document.cookie = 'level_id=' + "01" + '; expires=Thu, 2 Aug 2022 20:47:11 UTC; path=/';
        goHome()
    }
});
