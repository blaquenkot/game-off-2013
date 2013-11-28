define([], function() {
	var asKillable = function() {
		var oldUpdate = this.update;

		this.deathAnimation = function(){
			this.renderable.scaleFlag = true;
			var sizeTween = new me.Tween(this.renderable.scale)
			.to({x: 0.3, y: 0.3}, 10);
			var alphaTween = new me.Tween(this.renderable)
			.to({alpha: 0}, 10);
			sizeTween.start();
			alphaTween.start();
		},

		this.update = function() {
			if (me.game.currentLevel.blast && me.game.currentLevel.blast.caughtInExplosion(this)) {
				this.deathAnimation();
				me.game.remove(this);
			}

			if (oldUpdate) {
				oldUpdate.apply(this, arguments);
			}
		}
	};

	return asKillable;
});