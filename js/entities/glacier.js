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
			this.anchorPoint = new me.Vector2d(0, 1);
			this.updateColRect(0, settings.width, 1, settings.height);
			this.renderable.width = settings.width;
			this.renderable.height = settings.height;

			this.baseHeight = settings.height;
		},
		hasMelted: function() {
			return me.state.current().environment.iceMelting > this.baseHeight;
		},
		update: function() {
			if (this.hasMelted()) {
				me.game.remove(this);
				return false;
			}

			var melting = me.state.current().environment.iceMelting;

			if (this.hasMelted()) {
				return false;
			}

			this.renderable.height = melting > this.baseHeight ? 0 : this.baseHeight - melting;
			this.height = this.renderable.height;
			this.updateColRect(-1, undefined, 1, this.renderable.height);

			return this.parent();
		}
	});

	return Glacier;
})