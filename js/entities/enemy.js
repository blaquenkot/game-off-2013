define(['mixins/asKillable', 'mixins/asDrownable'], function(asKillable, asDrownable) {
	'use strict';

	// We can eventually make this more generic if we have several types of enemies
	var Enemy = me.ObjectEntity.extend({
		init: function(x, y, settings) {
			var settings = settings || {};

			settings.spriteheight = 22;
			settings.spritewidth = 50;
			settings.image = 'pantherTile';

			this.parent(x, y, settings);

			this.setVelocity(2, 10);
			this.renderable.addAnimation('anWalking', [0, 1, 2]);
			this.renderable.setCurrentAnimation('anWalking');
			this.walkingRight = true;
			this.type = me.game.ENEMY_OBJECT;

			this.startX = x;
			this.endX = x + settings.width - settings.spritewidth;
		},
		updateSound: function() {
				var _this = this;

				if (this.vel.x != 0){
					if (!this.playing) {
						this.playing = true;
						me.audio.play('step', false, function() {
							_this.playing = false;
						}, 0.7);
					}
				}
			},
		
        onDestroyEvent: function(){console.log("aaa");},
        update: function() {
			// Check if it should change direction
			if (this.walkingRight && this.pos.x >= this.endX) {
				this.walkingRight = false;
			} else if (!this.walkingRight && this.pos.x <= this.startX) {
				this.walkingRight = true;
			}

			this.flipX(!this.walkingRight);
			this.vel.x += (this.walkingRight) ? this.accel.x * me.timer.tick : -this.accel.x * me.timer.tick;

			this.updateMovement();
			this.updateSound();

			if (this.vel.x!=0 || this.vel.y!=0) {
				this.parent();
				return true;
			}

			return false;
		}
	});

	asKillable.call(Enemy.prototype);
	asDrownable.call(Enemy.prototype);

	return Enemy;
})