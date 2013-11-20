define([], function() {
	var Tool = me.CollectableEntity.extend({
		init: function(x, y, settings) {
			var x = x || 0,
					y = y || 0;

			this.parent(x, y, settings);
			this.anchorPoint = new me.Vector2d(0, 0);
			this.updateColRect(0, this.renderable.width, 0, this.renderable.height);
		},
		update: function() {
			this.updateMovement();
			this.parent();
			return true;
		},
		stop: function() {}
	});

	return Tool
});