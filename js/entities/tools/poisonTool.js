define(['entities/tool'], function(Tool) {
	'use strict';

	var Blast = me.ObjectEntity.extend({
		init:  function(x, y, settings) {
			var settings = settings || {},
					_this = this,
					callback,
					explosionTween,
					alphaTween;

			settings.image = 'poisonBlast';
			settings.collidable = false;

			this.duration = settings.duration || 1000;
			this.radiusScale = settings.radiusScale || 5;
			callback = settings.callback;

			delete settings.callback;
			delete settings.duration;

			this.parent(x, y, settings);
			this.z = 6;

			this.renderable.scaleFlag = true;

			explosionTween = new me.Tween(this.renderable.scale)
				.to({x: this.radiusScale, y: this.radiusScale}, this.duration);
			alphaTween = new me.Tween(this.renderable)
				.to({alpha: 0}, this.duration);

			explosionTween.onComplete(function() {
				me.game.currentLevel.blast = null;
				callback.call(_this);
				me.game.remove(_this);
			});

			explosionTween.start();
			alphaTween.start();

			me.game.currentLevel.blast = this;
		},
		caughtInExplosion: function(renderable) {
			var radius = this.renderable.width * this.renderable.scale.x;

			// Check if the renderable is above or below the blast
			var isAbove = renderable.bottom > this.pos.y;
			// And if it's to the left or to the right
			var isLeft = renderable.left > this.pos.x;

			var point = {};
			point.x = isLeft ? renderable.right : renderable.left;
			point.y = isAbove ? renderable.bottom : renderable.top;

			return Math.pow(point.x - this.pos.x, 2) + Math.pow(point.y - this.pos.y, 2) < Math.pow(radius, 2);
		},
		onDestroyEvent: function() {
			me.game.currentLevel.blast = null;
		}
	});

	var PoisonTool = Tool.extend({
		init: function(x, y, settings) {
			var settings = settings || {};
			settings.image = 'poisonTool';

			this.parent(x, y, settings);
			this.z = 1000;
			this.inUse = false;
			this.key = 'D';
		},
		use: function() {
			var _this = this;

			if (this.inUse) return;

			this.inUse = true;
			this.blast = new Blast(this.character.center().x, this.character.center().y, {
				callback: function() {
					_this.inUse = false;
				}
			});

			me.game.world.addChild(this.blast);
			me.event.publish('/tools/poisonBlast');
		},
		stop: function() {
			if (this.inUse) {
				me.game.remove(this.blast);
			}
		}
	});

	return PoisonTool;
});