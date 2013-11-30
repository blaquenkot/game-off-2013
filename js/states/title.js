define([], function() {
	var Title = me.ScreenObject.extend({
		init: function() {
			this.parent(true);
			this.font = null;
			this.background = me.loader.getImage("difusebg");
			this.title = me.loader.getImage("logo");
		},
		onResetEvent: function() {
			if (this.font === null) {
				this.font = new me.Font('Wendy', '4em', '#fff');
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
			context.drawImage(this.background, 0, 0);
			context.drawImage(this.title, 106, me.game.world.height / 2 - 200);
			this.font.draw(context, 'Press Enter to start', me.game.world.width / 2, me.game.world.height / 2 + 180);
		},
		onDestroyEvent: function() {
			me.input.unbindKey(me.input.KEY.ENTER);
		}
	});

	return Title;
})