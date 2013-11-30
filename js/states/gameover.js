define([], function() {
    var DeadOverlay = me.ColorLayer.extend({
		init: function(state) {
			this.parent('deadOverlay', '#C00', Infinity);
			this.state = state;
            this.alpha = 0.6;
		},
	});

    
    var GameOver = me.ScreenObject.extend({
		init: function() {
			this.font = null;
			this.parent(true);
            this.background = me.loader.getImage("difusebg");
            this.overlay = new DeadOverlay();
		},
		onResetEvent: function() {
            me.game.world.addChild(this.overlay);
			if (this.font === null) {
				this.font = new me.Font('Wendy', '4em', '#fff', 'center'); 
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
			context.drawImage(this.background, 0, 0);
            this.font.draw(context, 'Oh, you killed the planet', me.game.world.width / 2, me.game.world.height / 2 - 100);
			this.font.draw(context, 'Press 0 to restart', me.game.world.width / 2, me.game.world.height / 2 + 20);
		},
	});

	return GameOver;
});