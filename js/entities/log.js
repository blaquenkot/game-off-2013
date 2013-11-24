define(['buoyant', 'mixins/asKillable'], function(Buoyant, asKillable) {
	'use strict';

	var Log = Buoyant.extend({
		init: function(x, y, settings) {
			var settings = settings || {};

			settings.image = 'log';
			this.parent(x, y, settings);

			this.anchorPoint = new me.Vector2d(0, 0);
			this.updateColRect(0, this.renderable.width, 0, this.renderable.height);
		}
	});

	asKillable.call(Log.prototype);

	return Log;
});