define([], function() {
	var Title = me.ScreenObject.extend({
		init: function() {
			this.parent(true);
			this.font = null;
		},
		onResetEvent: function() {
			if (this.font === null) {
				this.font = new me.Font('arial', '4em', '#fff');
				this.font.textAlign = 'center';
			}
			me.input.bindKey(me.input.KEY.ENTER, "enter", true);
		},
		update: function() {
			if (me.input.isKeyPressed('enter')) {
				me.state.change(me.state.PLAY);
			}
			return false;
		},
		draw: function(context) {
			// Of course, the following is all temporary
			context.fillStyle = '#000';
			context.fillRect(0, 0, me.game.world.width, me.game.world.height);
			this.font.draw(context, 'ChChChChChanges', me.game.world.width / 2, me.game.world.height / 2 - 20);
			this.font.draw(context, 'Press Enter to start', me.game.world.width / 2, me.game.world.height / 2 + 20);
		},
		onDestroyEvent: function() {
			me.input.unbindKey(me.input.KEY.ENTER);
		}
	});

	return Title;
})