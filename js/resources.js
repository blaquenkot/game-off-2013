define([], function() {
	return [
		// Graphics
		{name: 'tile', type: 'image', src: '/game-off-2013/assets/tile.png'},
		{name: 'pjTile', type: 'image', src: '/game-off-2013/assets/pjtile.png'},
		{name: 'pantherTile', type: 'image', src: '/game-off-2013/assets/panthertile.png'},
		{name: 'log', type: 'image', src: '/game-off-2013/assets/log.png'},
		{name: 'waterTool', type: 'image', src: '/game-off-2013/assets/watertool.png'},
		{name: 'meltTool', type: 'image', src: '/game-off-2013/assets/melttool.png'},
		{name: 'poisonTool', type: 'image', src: '/game-off-2013/assets/poisontool.png'},
		{name: 'poisonBlast', type: 'image', src: '/game-off-2013/assets/blast.png'},
		{name: 'hudToolContainer', type: 'image', src: '/game-off-2013/assets/toolcontainer.png'},

		{name: 'logo', type: 'image', src: '/game-off-2013/assets/logo.png'},
		{name: 'difusebg', type: 'image', src: '/game-off-2013/assets/difusebg.png'},

		{name: 'hintWater', type: 'image', src: '/game-off-2013/assets/hintwater.png'},
		{name: 'hintPermanent', type: 'image', src: '/game-off-2013/assets/hintPermanent.png'},

		// Background
		{name: 'sky', type: 'image', src: '/game-off-2013/assets/sky.png'},
		{name: 'ground', type: 'image', src: '/game-off-2013/assets/ground.png'},
		{name: 'clouds', type: 'image', src: '/game-off-2013/assets/clouds.png'},
		{name: 'sun', type: 'image', src: '/game-off-2013/assets/sun.png'},

		// Maps
		{name: 'level1', type: 'tmx', src: '/game-off-2013/data/level1.tmx'},
		{name: 'level2', type: 'tmx', src: '/game-off-2013/data/level2.tmx'},
    {name: 'level3', type: 'tmx', src: '/game-off-2013/data/level3.tmx'},
    {name: 'level4', type: 'tmx', src: '/game-off-2013/data/level4.tmx'},
    {name: 'level5', type: 'tmx', src: '/game-off-2013/data/level5.tmx'},
    {name: 'level6', type: 'tmx', src: '/game-off-2013/data/level6.tmx'},
    {name: 'level7', type: 'tmx', src: '/game-off-2013/data/level7.tmx'},

		// Background Music
		{name: "background", type: "audio", src: "/game-off-2013/data/music/", channel : 1},

		// SFX
		{name: "step", type: "audio", src: "/game-off-2013/data/sfx/", channel : 1},
		{name: "newTool", type: "audio", src: "/game-off-2013/data/sfx/", channel : 1}
	];
});