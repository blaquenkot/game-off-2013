define(['environment', 'water', 'entities/glacier'], function(Environment, Water, Glacier) {
	var Credits = me.ScreenObject.extend({
		init: function() {
			this.font = null;
			this.parent(true);
		},
		onResetEvent: function() {
			if (this.font === null) {
				this.font = new me.Font('wendy', '2em', '#fff');
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
			this.font.draw(context, Environment.MAX_YEARS - me.game.enviromentalStats.yearsLeft + ' years lost', me.game.world.width / 2 - 100, me.game.world.height / 2 - 40);
			this.font.draw(context, Water.toMeters(me.game.enviromentalStats.waterLevel).toFixed(2) + 'm of water raised', me.game.world.width / 2 - 100, me.game.world.height / 2 - 20);
			this.font.draw(context, Glacier.toCubicCm(me.game.enviromentalStats.iceMelted).toFixed(2) + ' cm3 of ice melted', me.game.world.width / 2 - 100, me.game.world.height / 2);
			this.font.draw(context, 'Press 0 to try again', me.game.world.width / 2 - 100, me.game.world.height / 2 + 20);
		}
	});

	return Credits;
})