define(['hud', 'stateManager', 'environment', 'water', 'entities/log', 'entities/tools/waterTool', 'entities/tools/meltTool', 'entities/tools/poisonTool', 'hintBox'],
	function(Hud, StateManager, Environment, Water, Log, WaterTool, MeltTool, PoisonTool, HintBox) {
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

		var DeadOverlay = me.ColorLayer.extend({
			init: function(state) {
				this.parent('deadOverlay', '#C00', Infinity);
				this.state = state;
				this.alpha = 0;
			},
			update: function() {
				if (this.alpha >= DeadOverlay.MAX_ALPHA) {
					return false;
				}

				this.alpha = (Environment.MAX_YEARS - this.state.environment.yearsLeft) / Environment.MAX_YEARS * DeadOverlay.MAX_ALPHA;
				this.parent();
				return true;
			}
		});

		DeadOverlay.MAX_ALPHA = 0.6;

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
					_this.environment.reduceYears(1);
				});

				me.event.subscribe('/tools/meltIce', function(melt) {
					_this.environment.iceMelting += melt || 0.6;
					if (!allIceMelted()) {
						_this.environment.reduceYears(1);
						me.event.publish('/tools/raiseWater', [0.1]);
					}
				});

				me.event.subscribe('/tools/poisonBlast', function() {
					_this.environment.reduceYears(10);
				});

				me.event.subscribe('/environment/noMoreYears', function() {
					me.state.change(me.state.GAMEOVER);
				});

				me.game.onLevelLoaded = function(levelId) {
					if (_this.levelId != levelId) {
						// we changed levels, save the starting environment and the stats
						_this.levelId = levelId;
						_this.environment.saveStats();
						_this.oldEnvironment = _this.environment.clone();
					}

					if (levelId === 'level2') { // I'm so sorry
						new HintBox(150, 470, 'hintPermanent').show();
					}

					_this.environment = _this.oldEnvironment.clone();

					_this.hud.resetTools();
					_this.baseHeight = 0;
					_this.water = new Water();
					_this.overlay = new DeadOverlay(_this);
					me.game.world.addChild(_this.water);
					me.game.world.addChild(_this.overlay);

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
				this.hud = new Hud.Container();
				me.game.add(this.hud);
				me.levelDirector.loadLevel('level1');
				me.audio.playTrack('background', 0.7);
			},
			onDestroyEvent: function() {
				this.environment.saveStats();
				me.game.enviromentalStats = this.environment.stats;
				me.game.world.removeChild(this.hud);
				me.audio.stopTrack();
			}
		});

		return Play;
	}
);
