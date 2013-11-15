define(['entities/tool'], function(Tool) {
	'use strict';

	var WaterTool = Tool.extend({
		init: function(x, y, settings) {
			var x = x || 0,
					y = y || 0,
					settings = settings || {};
			settings.image = 'waterTool';

			this.parent(x, y, settings);
			this.z = 1000;
		},
		use: function() {
      me.event.publish('/tools/raiseWater');
		}
	});

  return WaterTool;
});