define([], function() {
	var Water = me.ColorLayer.extend({
		init: function() {
			this.parent('water', '#64B7A9', 100);
			this.alpha = 0.5;
			this.pos.x = 0;
			this.width = me.game.world.width;
			this.alwaysUpdate = true;
		},
		draw: function(context) {
			this.drawn = true;
			this.parent(context, this);
		},
		update: function() {
			this.parent();
			var updated = this.updated;

			this.pos.y = me.game.world.height - me.state.current().environment.waterHeight();
			this.height = me.game.world.height - this.pos.y;
			this.updated = false;

			return updated;
		},
		isOver: function(renderable) {
			// the 5 is a magic number to fix a little bug with the death
			return this.drawn && renderable.top > (this.pos.y - 5);
		},
		submerged: function(renderable) {
			return this.drawn ? renderable.bottom - this.pos.y : 0;
		}
	});

	Water.toMeters = function(amount) {
		return amount / (46 / 1.7); // The character is 46 pixels tall, assume that's 1.70m
	}

	return Water;
});
