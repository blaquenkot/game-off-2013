define(['buoyant'], function(Buoyant) {
	'use strict';

	var Ice = me.ColorLayer.extend({
		init: function() {
			this.parent('ice', '#fff', 110);
		},
		draw: function(context) { // TODO: Why do we need this
			this.parent(context, this);
		},
		destroy: function() {} // HORRIBLE hack so it won't crash on level reload
	});

	var Glacier = Buoyant.extend({
		init: function(x, y, settings) {
			var settings = settings || {};

			this.parent(x, y, settings);

			this.floatingFactor = 0.05;
			this.renderable = new Ice();
			this.anchorPoint = new me.Vector2d(0, 0);
			this.updateColRect(0, settings.width, 0, settings.height);
			this.renderable.width = settings.width;
			this.renderable.height = settings.height;
		}
	});

	return Glacier;
})