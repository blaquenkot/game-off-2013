define([], function() {
	var asKillable = function() {
		var oldUpdate = this.update;
        var _this = this;
        
		this.update = function() {
			if (me.game.currentLevel.blast && me.game.currentLevel.blast.caughtInExplosion(this)) {
				this.renderable.scaleFlag = true;
                var sizeTween = new me.Tween(this.renderable.scale)
                .to({x: 0.3, y: 0.3}, 1000);
                var alphaTween = new me.Tween(this.renderable)
                .to({alpha: 0}, 1000);
                alphaTween.onComplete(function(){console.log(_this); me.game.remove(_this, true);}); 
                sizeTween.start();
                alphaTween.start();
                this.collidable = false;
                this.gravity = 0;
                if (this.onDeath) {
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