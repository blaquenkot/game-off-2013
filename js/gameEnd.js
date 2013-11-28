define([], function() {
	var GameEnd = me.CollectableEntity.extend({
		onDestroyEvent: function() {
			me.game.viewport.fadeIn('#000', 100, function() {
				me.state.change(me.state.CREDITS);
			});
		}
	});

	return GameEnd;
});