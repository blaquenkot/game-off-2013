define([], function() {
	var Tool = me.ObjectEntity.extend({
		init: function(x, y, settings) {
			var x = x || 0,
					y = y || 0;

			this.parent(x, y, settings);
			this.anchorPoint = new me.Vector2d(0, 0);
			this.updateColRect(0, this.renderable.width, 0, this.renderable.height);
		},
		update: function() {
			if (!this.character) {
				this.updateMovement();

				if (this.vel.x!=0 || this.vel.y!=0) {
					this.parent();
					return true;
				}
			}

			return false;
		},
		onCollision: function(res, obj) {
			this.pickup();
		},
		pickup: function() {
			var _this = this,
					radiusScale = 3,
					duration = 300;

			this.collidable = false;
			this.gravity = 0;

			var sizeTween = new me.Tween(this.renderable.scale)
				.to({x: radiusScale, y: radiusScale}, duration);
			var alphaTween = new me.Tween(this.renderable)
				.to({alpha: 0}, duration);

			this.renderable.scaleFlag = true;

			sizeTween.onComplete(function() {
				me.game.remove(_this);
				sizeTween = null;
				alphaTween = null;
			});

			sizeTween.start();
			alphaTween.start();
		},
		stop: function() {}
	});

	return Tool
});