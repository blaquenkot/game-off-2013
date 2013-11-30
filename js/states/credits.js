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

	var DeadOverlay = me.ColorLayer.extend({
		init: function(state) {
			this.parent('deadOverlay', '#C00', Infinity);
			this.state = state;
			if(me.game.enviromentalStats){
				this.alpha = (Environment.MAX_YEARS - me.game.enviromentalStats.yearsLeft) / Environment.MAX_YEARS * DeadOverlay.MAX_ALPHA;
			}
		},
	});

	DeadOverlay.MAX_ALPHA = 0.6;

	var Credits = me.ScreenObject.extend({
		init: function() {
			this.font = null;
			this.parent(true);
			this.twitterCoords = new me.Rect(new me.Vector2d(me.game.world.width / 2 - 50, me.game.world.height - 30), 82, 20); //fix
			this.facebookCoords = new me.Rect(new me.Vector2d(me.game.world.width / 2 + 45, me.game.world.height - 30), 102, 20); //fix
			this.background = me.loader.getImage("difusebg");
			this.overlay = new DeadOverlay(this);
			me.game.world.addChild(this.overlay);
		},
		onResetEvent: function() {
			this.overlay = new DeadOverlay(this);
			me.game.world.addChild(this.overlay);
			var socialMessage = new SocialMessage(me.game.enviromentalStats);

			if (this.font === null) {
				this.font = new me.Font('wendy', '3em', '#fff', 'center');
			}

			me.game.viewport.fadeOut('#000', 100);

			// Twitter event
			me.input.registerPointerEvent('mousedown', this.twitterCoords, function() {
				window.open('https://twitter.com/intent/tweet?hashtags=ChChChChChanges&url=' + socialMessage.getUrl() + '&text=' + socialMessage.getEncodedMessage(), 'Tweet!', '_blank,width=420,height=230');
			});

			// Facebook event
			me.input.registerPointerEvent('mousedown', this.facebookCoords, function() {
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
			context.drawImage(this.background, 0, 0);
			var animalsKilled = me.game.enviromentalStats.animalsKilled;
			this.font.draw(context, Environment.MAX_YEARS - me.game.enviromentalStats.yearsLeft + ' years lost', me.game.world.width / 2, me.game.world.height / 2 - 50);
			this.font.draw(context, Water.toMeters(me.game.enviromentalStats.waterLevel).toFixed(2) + 'm of water raised', me.game.world.width / 2, me.game.world.height / 2 - 30);
			this.font.draw(context, Glacier.toCubicCm(me.game.enviromentalStats.iceMelted).toFixed(2) + ' cm3 of ice melted', me.game.world.width / 2, me.game.world.height / 2 - 10);
			this.font.draw(context, animalsKilled + (animalsKilled == 1 ? ' animal' : ' animals') + ' killed', me.game.world.width / 2 , me.game.world.height / 2 + 10);
			this.font.draw(context, 'Press 0 to try again', me.game.world.width / 2, me.game.world.height / 2 + 30);

			this.font.draw(context, 'Share on Twitter | Facebook', me.game.world.width / 2, me.game.world.height - 40);
		}
	});

	return Credits;
})