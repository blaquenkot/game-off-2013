define(['../environment', 'water', 'entities/log'], function(Environment, Water, Log) {
	var TestLevel = me.ScreenObject.extend({
		init: function() { // Constructor
			var _this = this;

			me.event.subscribe('/tools/raiseWater', function() {
				_this.environment.waterLevel += 1; // TODO: This could be received as a parameter
				_this.water.updated = true;
			});
		},
		onResetEvent: function() { // Called when the state changes into this screen
			this.environment = new Environment();
			this.baseHeight = 0;

			me.levelDirector.loadLevel('testlevel');

			this.water = new Water(this);
			me.game.world.addChild(this.water);

			// TODO: Added just as a test
			this.log = new Log(120, 350);
			me.game.world.addChild(this.log);
		},
		waterHeight: function() {
			return this.environment.waterLevel - this.baseHeight;
		}
	});

	return TestLevel;
});
