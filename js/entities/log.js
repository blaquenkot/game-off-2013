define(['buoyant'], function(Buoyant) {
	'use strict';

	var Log = Buoyant.extend({
		init: function(x, y, settings) {
			var settings = settings || {};

			settings.image = 'log';
			this.parent(x, y, settings);

			this.anchorPoint = new me.Vector2d(0, 0);
			this.updateColRect(0, this.renderable.width, 0, this.renderable.height);
		},
		update: function() { // TMP: just to check collision with blast
			if (me.game.currentLevel.blast && me.game.currentLevel.blast.caughtInExplosion(this)) {
				console.log('caught in explosion', this);
			}

			return this.parent();
		}
	});

	return Log;
});