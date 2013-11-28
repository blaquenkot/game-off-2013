define(['resources', 'states/title', 'states/play', 'states/gameover', 'states/credits', 'character', 'entities/enemy', 'water', 'entities/tools/waterTool', 'entities/tools/meltTool', 'entities/tools/poisonTool', 'entities/log', 'entities/glacier', 'gameEnd'],
	function(resources, TitleState, PlayState, GameOverState, CreditsState, Character, Enemy, Water, WaterTool, MeltTool, PoisonTool, Log, Glacier, GameEnd) {
		'use strict';

		function Game() { }

		Game.prototype.run = function() {
			if (!me.video.init('game', 912, 544, true)) {
				alert('Your browser does not support HTML5 canvas.');
				return;
			}

			if (document.location.hash === "#debug") {
				window.onReady(function () {
					me.plugin.register.defer(debugPanel, "debug");
				});
				me.audio.disable();
			}

			// Initialize audio
			me.audio.init("mp3,ogg");

			// Callback when everything is loaded
			me.loader.onload = this.loaded;

			// Load the resources
			me.loader.preload(resources);

			// Initialize melonJS and display a loading screen.
			me.state.change(me.state.LOADING);
		};

		Game.prototype.loaded = function() {
			me.state.set(me.state.MENU, new TitleState());
			me.state.set(me.state.PLAY, new PlayState());
			me.state.set(me.state.GAMEOVER, new GameOverState());
			me.state.set(me.state.CREDITS, new CreditsState());

			me.entityPool.add('character', Character);
			me.entityPool.add('enemy', Enemy);
			me.entityPool.add('log', Log);
			me.entityPool.add('glacier', Glacier);
			me.entityPool.add('waterTool', WaterTool);
			me.entityPool.add('meltTool', MeltTool);
			me.entityPool.add('poisonTool', PoisonTool);
			me.entityPool.add('gameEnd', GameEnd);
			me.sys.gravity = 0.98;

			me.input.bindKey(me.input.KEY.LEFT, 'left');
			me.input.bindKey(me.input.KEY.RIGHT, 'right');
			me.input.bindKey(me.input.KEY.UP, 'jump', true);
			me.input.bindKey(me.input.KEY.NUM1, 'waterTool');
			me.input.bindKey(me.input.KEY.NUM2, 'meltTool');
			me.input.bindKey(me.input.KEY.NUM3, 'poisonTool');

			me.input.bindKey(me.input.KEY.NUM0, 'reset');

			// Start the game.
			me.state.change(me.state.MENU);
		};

		return Game;
	}
);