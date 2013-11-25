define([], function() {
	/**
	 * Simple buoyant object.
	 * Don't expect it to follow the laws of physics. How much it floats
	 * can be controlled by the floatingFactor setting.
	 */
	var Buoyant = me.ObjectEntity.extend({
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.alwaysUpdate = true;
			this.floatingFactor = settings.floatingFactor || 0.25;
			this.z = 1001;
		},
		update: function() {
			var water = me.state.current().water;

			var submerged = water.submerged(this);
			if (submerged > 0) {
				this.vel.y = -this.gravity * submerged * this.floatingFactor;
			}

			this.updateMovement();

			if (this.vel.x!=0 || this.vel.y!=0) {
				this.parent();
				return true;
			}

			return false;
		}
	});

	return Buoyant;
});