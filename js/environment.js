define([], function() {
	'use strict';

	function Environment(values) {
		var values = values || {};

		this.waterLevel = values.waterLevel || 10;
		this.iceMelting = values.iceMelting || 0;
		this.iceMelted = values.iceMelted || 0;
		this.yearsLeft = values.yearsLeft || Environment.MAX_YEARS;
		this.stats = values.stats || {
			waterLevel: this.waterLevel,
			iceMelted: this.iceMelting,
			yearsLeft: this.yearsLeft,
			animalsKilled: 0
		};
	}

	Environment.MAX_YEARS = 1500;

	Environment.prototype.waterHeight = function() {
		return this.waterLevel - (me.game.currentLevel.baseHeight || 0);
	};

	Environment.prototype.reduceYears = function(years) {
		this.yearsLeft -= years;

		if (this.yearsLeft <= 0) {
			me.event.publish('/environment/noMoreYears');
		}
	};

	Environment.prototype.clone = function() {
		// We don't want to keep the melting level
		return new Environment({
			waterLevel: this.waterLevel,
			yearsLeft: this.yearsLeft,
			stats: _.clone(this.stats)
		});
	};

	Environment.prototype.saveStats = function() {
		this.stats.waterLevel += this.waterLevel;
		this.stats.iceMelted += this.iceMelting;
		this.stats.yearsLeft = this.yearsLeft;
		this.stats.animalsKilled += 1; // TODO: Real count
	}

	return Environment;
});
