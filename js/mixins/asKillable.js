define([], function() {
	var asKillable = function() {
		var oldUpdate = this.update;
        
		this.update = function() {
			if (me.game.currentLevel.blast && me.game.currentLevel.blast.caughtInExplosion(this)) {
				this.renderable.scaleFlag = true;
                var sizeTween = new me.Tween(this.renderable.scale)
                .to({x: 0.3, y: 0.3}, 200);
                var alphaTween = new me.Tween(this.renderable)
                .to({alpha: 0}, 200);
                sizeTween.start();
                alphaTween.start();
                this.collidable = false;
                this.gravity = 0;
                if (this.onDeath && this.alive) {
                    this.alive = false;
					this.onDeath();
				}
                return;
            }

			if (oldUpdate) {
				oldUpdate.apply(this, arguments);
			}
		}
	};

	return asKillable;
});