define([], function() {
	var asKillable = function() {
		var oldUpdate = this.update;

		this.update = function() {
			if (me.game.currentLevel.blast && me.game.currentLevel.blast.caughtInExplosion(this)) {
				console.log('caught in explosion', this);
			}

			if (oldUpdate) {
				oldUpdate.apply(this, arguments);
			}
		}
	};

	return asKillable;
});