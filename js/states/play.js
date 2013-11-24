define(['stateManager', 'environment', 'water', 'entities/log', 'entities/tools/waterTool', 'entities/tools/meltTool', 'entities/tools/poisonTool'],
	function(StateManager, Environment, Water, Log, WaterTool, MeltTool, PoisonTool) {
		'use strict';

		var toolsMap = {
			water: {
				name: 'waterTool',
				klass: WaterTool
			},
			melt: {
				name: 'meltTool',
				klass: MeltTool
			},
			poison: {
				name: 'poisonTool',
				klass: PoisonTool
			}
		};

		function allIceMelted() {
			return me.game.world.getEntityByProp('name', 'glacier').length === 0;
		}

		var Play = me.ScreenObject.extend({
			init: function() {
				var _this = this;

				// TODO: The event listeners should probably be somewhere else
				me.event.subscribe('/tools/raiseWater', function(change) {
					_this.environment.waterLevel += change || 1;
					_this.water.updated = true;
				});

				me.event.subscribe('/tools/meltIce', function(melt) {
					_this.environment.iceMelting += melt || 0.6;
					if (!allIceMelted()) {
						me.event.publish('/tools/raiseWater', [0.2]);
					}
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
					_this.water = new Water();
					me.game.world.addChild(_this.water);

					new StateManager(function() {
						// Move the clouds
						var layer = me.game.currentLevel.getLayers()[3]
						layer.pos.x = layer.pos.x + layer.xSpeed * me.timer.tick;;

						// Listen for the reset event
						if (me.input.isKeyPressed('reset')) {
							me.state.change(me.state.MENU);
						}
					});

					if (me.game.currentLevel.tools) {
						// Give the character the initial tools
						var character = me.game.world.getEntityByProp('name', 'character')[0],
								tools = me.game.currentLevel.tools,
								toolIndex,
								toolName;

						for (toolIndex = 0; toolIndex < tools.length; toolIndex++) {
							var toolName = tools[toolIndex];
							character.addTool(toolName, new toolsMap[toolName].klass());
						}
					}
				};
			},
			onResetEvent: function() { // Called when the state changes into this screen
				this.environment = new Environment();
				me.levelDirector.loadLevel('level1');
				me.audio.playTrack('background', 0.7);
			},
			onDestroyEvent: function() {
				me.audio.stopTrack();
			}
		});

		return Play;
	}
);
