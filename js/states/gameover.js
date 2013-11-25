define([], function() {
	var GameOver = me.ScreenObject.extend({
		init: function() {
			this.font = null;
			this.parent(true);
		},
		onResetEvent: function() {
			if (this.font === null) {
				this.font = new me.Font('arial', '4em', '#fff', 'center');
			}
		},
		update: function() {
			// Listen for the reset event
			if (me.input.isKeyPressed('reset')) {
				me.state.change(me.state.MENU);
			}

			return true;
		},
		draw: function(context) {
			context.fillStyle = '#000';
			context.fillRect(0, 0, me.game.world.width, me.game.world.height);
			this.font.draw(context, 'Game over', me.game.world.width / 2, me.game.world.height / 2 - 20);
			this.font.draw(context, 'Press 0 to restart', me.game.world.width / 2, me.game.world.height / 2 + 20);
		},
	});

	return GameOver;
});