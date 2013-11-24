define([], function() {
	var asDrownable = function() {
		var oldUpdate = this.update;

		this.update = function() {
			if (me.state.current().water.isOver(this)) {
				me.game.remove(this);
			}

			if (oldUpdate) {
				oldUpdate.apply(this, arguments);
			}
		}
	};

	return asDrownable;
});