define(['resources', 'states/play', 'character', 'water', 'entities/tools/waterTool', 'entities/log', 'entities/glacier'],
	function(resources, PlayState, Character, Water, WaterTool, Log, Glacier) {
		'use strict';

		function Game() { }

		Game.prototype.run = function() {
			if (!me.video.init('screen', 912, 544, true)) {
				alert('Your browser does not support HTML5 canvas.');
				return;
			}

			if (document.location.hash === "#debug") {
				window.onReady(function () {
					me.plugin.register.defer(debugPanel, "debug");
				});
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
			me.state.set(me.state.PLAY, new PlayState());

			me.entityPool.add('character', Character);
			me.entityPool.add('log', Log);
			me.entityPool.add('glacier', Glacier);
			me.entityPool.add('waterTool', WaterTool);
			me.sys.gravity = 0.98;

			me.input.bindKey(me.input.KEY.LEFT, 'left');
			me.input.bindKey(me.input.KEY.RIGHT, 'right');
			me.input.bindKey(me.input.KEY.UP, 'jump', true);
			me.input.bindKey(me.input.KEY.A, 'waterTool');

			// Start the game.
			me.state.change(me.state.PLAY);
		};

		return Game;
	}
);