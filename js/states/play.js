define(['environment', 'water', 'entities/log', 'entities/tools/waterTool'],
	function(Environment, Water, Log, WaterTool) {
		var Play = me.ScreenObject.extend({
			init: function() {
				var _this = this;

				me.event.subscribe('/tools/raiseWater', function() {
					_this.environment.waterLevel += 1; // TODO: This could be received as a parameter
					_this.water.updated = true;
				});

				me.game.onLevelLoaded = function(levelId) {
					if (_this.levelId != levelId) {
						// we changed levels, save the starting environment
						_this.levelId = levelId;
						_this.oldEnvironment = _.clone(_this.environment)
					} else {
						// we restarted the level, reset the old environment
						_this.environment = _.clone(_this.oldEnvironment);
					}

					_this.baseHeight = 0;
					_this.water = new Water(_this);
					me.game.world.addChild(_this.water);
				};
			},
			onResetEvent: function() { // Called when the state changes into this screen
				this.environment = new Environment();
				me.levelDirector.loadLevel('level1');
				me.audio.playTrack('background', 0.7);
			},
			onDestroyEvent: function() {
				me.audio.stopTrack();
			},
			waterHeight: function() {
				return this.environment.waterLevel - this.baseHeight;
			}
		});

		return Play;
	}
);
