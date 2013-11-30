define(['buoyant'], function(Buoyant) {
	'use strict';

	var Ice = me.SpriteObject.extend({
		init: function(x, y, glacier) {
			this.glacier = glacier;
			this.parent(x, y, {image: 'iceTile'});
		},
		draw: function(context) {
			var pattern = context.createPattern(me.loader.getImage('iceTile'), 'repeat');
			context.fillStyle = pattern;
			context.fillRect(0, 0, this.width, this.height);
		}
	});

	var Glacier = Buoyant.extend({
		init: function(x, y, settings) {
			var settings = settings || {};

			this.parent(x, y, settings);

			this.floatingFactor = 0.05;
			this.renderable = new Ice(x, y, this);
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

	Glacier.toCubicCm = function(amount) {
		// Same logic as in the water, the character is 46 pixels tall, assume that's 170cm
		return amount / (46 / 170);
	};

	return Glacier;
})