define([], function() {
	function Environment() {
		var _this = this;

		this.waterLevel = 10;
		this.iceMelting = 0;
		this.yearsLeft = Environment.MAX_YEARS;
	}

	Environment.MAX_YEARS = 1000;

	Environment.prototype.waterHeight = function() {
		return this.waterLevel - (me.game.currentLevel.baseHeight || 0);
	};

	Environment.prototype.reduceYears = function(years) {
		this.yearsLeft -= years;

		if (this.yearsLeft <= 0) {
			me.event.publish('/environment/noMoreYears');
		}
	};

	return Environment;
});
