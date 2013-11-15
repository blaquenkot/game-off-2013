define(['entities/tool'], function(Tool) {
	var WaterTool = Tool.extend({
		init: function(x, y, settings) {
			var settings = settings || {};
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