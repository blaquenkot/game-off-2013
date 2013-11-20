define([], function() {
	function Environment() {
		var _this = this;

		this.waterLevel = 10;
		this.iceMelting = 0;
		this.yearsLeft = 10000;
	}

	Environment.prototype.waterHeight = function() {
		return this.waterLevel - (me.game.currentLevel.baseHeight || 0);
	};

	return Environment;
});
