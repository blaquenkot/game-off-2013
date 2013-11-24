define(['mixins/asKillable', 'mixins/asDrownable'], function(asKillable, asDrownable) {
	'use strict';

	// We can eventually make this more generic if we have several types of enemies
	var Enemy = me.ObjectEntity.extend({
		init: function(x, y, settings) {
			var settings = settings || {};

			settings.spriteheight = 46;
			settings.spritewidth = 32;
			settings.image = 'pjTile'

			this.parent(x, y, settings);

			this.setVelocity(3, 15);
			this.renderable.addAnimation('anRight', [6, 7, 8, 9, 10, 11]);
			this.renderable.setCurrentAnimation('anRight');
			this.walkingRight = true;
			this.type = me.game.ENEMY_OBJECT;

			this.startX = x;
			this.endX = x + settings.width - settings.spritewidth;

			// this.pos.x = x + settings.width - settings.spritewidth;
		},
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
			this.parent();
			return true;
		}
	});

	asKillable.call(Enemy.prototype);
	asDrownable.call(Enemy.prototype);

	return Enemy;
})