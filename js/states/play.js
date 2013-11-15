define(['environment', 'water', 'entities/log', 'entities/tools/waterTool'],
	function(Environment, Water, Log, WaterTool) {
		'use strict';

		var toolsMap = {
			water: {
				name: 'waterTool',
				klass: WaterTool
			}
		};

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

					if (me.game.currentLevel.tools) {
						// Give the character the initial tools
						var character = me.game.world.getEntityByProp('name', 'character')[0],
								tools = me.game.currentLevel.tools,
								toolIndex,
								toolName;

						for (toolIndex = 0; toolIndex < tools.length; toolIndex++) {
							var toolName = tools[toolIndex];

							// Instantiate the tool and give it to the player
							character[toolsMap[toolName].name] = new toolsMap[toolName].klass();
						}
					}
				};
			},
			onResetEvent: function() { // Called when the state changes into this screen
				this.environment = new Environment();
				me.levelDirector.loadLevel('level1');
			},
			waterHeight: function() {
				return this.environment.waterLevel - this.baseHeight;
			}
		});

		return Play;
	}
);
