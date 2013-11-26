define(['entities/tool'], function(Tool) {
	'use strict';

	var MeltTool = Tool.extend({
		init: function(x, y, settings) {
			var x = x || 0,
					y = y || 0,
					settings = settings || {};
			settings.image = 'meltTool';

			this.parent(x, y, settings);
			this.z = 1000;
			this.key = 'S';
		},
		use: function() {
			me.event.publish('/tools/meltIce');
		}
	});

  return MeltTool;
});