define(['environment', 'water', 'entities/glacier'], function(Environment, Water, Glacier) {
	function SocialMessage(stats) {
		this.messages = [
			"I won with " + stats.yearsLeft + " years left, can you do better?"
		];
	}

	SocialMessage.prototype.getMessage = function() {
		return this.messages[Math.floor((Math.random() * 10)) % this.messages.length];
	};

	SocialMessage.prototype.getEncodedMessage = function() {
		return encodeURIComponent(this.getMessage());
	};

	SocialMessage.prototype.getUrl = function() {
		return encodeURIComponent('http://joliv.me/game-off-2013');
	};

	var Credits = me.ScreenObject.extend({
		init: function() {
			this.font = null;
			this.parent(true);
			this.twitterCoords = new me.Rect(new me.Vector2d(me.game.world.width / 2 - 55, me.game.world.height - 20), 60, 20);
			this.facebookCoords = new me.Rect(new me.Vector2d(me.game.world.width / 2 + 10, me.game.world.height - 20), 70, 20);
		},
		onResetEvent: function() {
			var socialMessage = new SocialMessage(me.game.enviromentalStats);

			if (this.font === null) {
				this.font = new me.Font('wendy', '2em', '#fff');
			}

			me.game.viewport.fadeOut('#000', 100);

			// Twitter event
			me.input.registerPointerEvent('mousedown', this.twitterCoords, function() {
				window.open('https://twitter.com/intent/tweet?hashtags=chchchchchanges&url=' + socialMessage.getUrl() + '&text=' + socialMessage.getEncodedMessage(), 'Tweet!', '_blank,width=420,height=230');
			});

			// Facebook event
			me.input.registerPointerEvent('mousedown', this.facebookCoords, function() {
				// TODO: Check how to add a specific message
				window.open('http://www.facebook.com/sharer.php?u=' + socialMessage.getUrl(), 'Share!', '_blank,width=620,height=300');
			});
		},
		onDestroyEvent: function() {
			me.input.releasePointerEvent('mousedown', this.twitterCoords);
		},
		update: function() {
			// Listen for the reset event
			if (me.input.isKeyPressed('reset')) {
				me.state.change(me.state.MENU);
			}

			return true;
		},
		draw: function(context) {
			var animalsKilled = me.game.enviromentalStats.animalsKilled;
			context.fillStyle = '#000';
			context.fillRect(0, 0, me.game.world.width, me.game.world.height);
			this.font.draw(context, Environment.MAX_YEARS - me.game.enviromentalStats.yearsLeft + ' years lost', me.game.world.width / 2 - 100, me.game.world.height / 2 - 60);
			this.font.draw(context, Water.toMeters(me.game.enviromentalStats.waterLevel).toFixed(2) + 'm of water raised', me.game.world.width / 2 - 100, me.game.world.height / 2 - 40);
			this.font.draw(context, Glacier.toCubicCm(me.game.enviromentalStats.iceMelted).toFixed(2) + ' cm3 of ice melted', me.game.world.width / 2 - 100, me.game.world.height / 2 - 20);
			this.font.draw(context, animalsKilled + (animalsKilled == 1 ? ' animal' : ' animals') + ' killed', me.game.world.width / 2 - 100, me.game.world.height / 2);
			this.font.draw(context, 'Press 0 to try again', me.game.world.width / 2 - 100, me.game.world.height / 2 + 20);

			this.font.draw(context, 'Share on Twitter | Facebook', me.game.world.width / 2 - 115, me.game.world.height - 20);
		}
	});

	return Credits;
})