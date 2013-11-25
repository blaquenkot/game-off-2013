define([], function() {
	var StateManager = me.ObjectEntity.extend({ // wat
		init: function(updateCallback) {
			this.parent(1, 1, {image: 'log'}); // just some random image so it will work
			this.updateCallback = updateCallback;
			me.game.world.addChild(this);
		},
		update: function() {
			return this.updateCallback();
		}
	});

	return StateManager;
});