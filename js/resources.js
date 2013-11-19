define([], function() {
	return [
		// Graphics
		{name: 'tile', type: 'image', src: '/game-off-2013/assets/tile.png'},
		{name: 'pjTile', type: 'image', src: '/game-off-2013/assets/pjtile.png'},
		{name: 'log', type: 'image', src: '/game-off-2013/assets/log.png'},
		{name: 'waterTool', type: 'image', src: '/game-off-2013/assets/watertool.png'},


		// Background
		{name: 'sky', type: 'image', src: '/game-off-2013/assets/sky.png'},
		{name: 'ground', type: 'image', src: '/game-off-2013/assets/ground.png'},
		{name: 'foreground', type: 'image', src: '/game-off-2013/assets/foreground.png'},
		{name: 'fog', type: 'image', src: '/game-off-2013/assets/fog.png'},
		{name: 'clouds', type: 'image', src: '/game-off-2013/assets/clouds.png'},
		{name: 'sun', type: 'image', src: '/game-off-2013/assets/sun.png'},

		// Maps
		{name: 'level1', type: 'tmx', src: '/game-off-2013/data/level1.tmx'},
		{name: 'level2', type: 'tmx', src: '/game-off-2013/data/level2.tmx'},

		// Background Music
		{name: "background", type: "audio", src: "/game-off-2013/data/music/", channel : 2},

		// SFX
		{name: "step", type: "audio", src: "/game-off-2013/data/sfx/", channel : 2}
	];
});