define([], function() {
	var YearsLeft = me.Renderable.extend({
		init: function(x, y) {
			this.parent(new me.Vector2d(x, y), 10, 10);
			this.years = -1;
			this.floating = true;
			this.font = new me.Font('VT323', 20, '#000', 'center');
		},
		update: function() {
			if (this.years !== me.state.current().environment.yearsLeft) {
				this.years = me.state.current().environment.yearsLeft;
				return true;
			}

			return false;
		},
		draw: function(context) {
			this.font.draw(context, this.years + ' years left', this.pos.x, this.pos.y);
		}
	});

	var WaterLevel = me.Renderable.extend({
		init: function(x, y) {
			this.parent(new me.Vector2d(x, y), 10, 10);
			this.waterLevel = -1;
			this.floating = true;
			this.font = new me.Font('VT323', 20, '#000', 'right');
		},
		update: function() {
			if (this.waterLevel !== me.state.current().environment.waterLevel) {
				this.waterLevel = me.state.current().environment.waterLevel;
				return true;
			}

			return false;
		},
		draw: function(context) {
			var meters = this.waterLevel / (46 / 1.7); // The character is 46 pixels tall, assume that's 1.70m
			this.font.draw(context, 'Water level: ' + meters.toFixed(2) + ' meters', this.pos.x, this.pos.y);
		}
	});

	var Hud = {
		Container: me.ObjectContainer.extend({
			init: function() {
				this.parent();
				this.isPersistent = true;
				this.collidable = false;
				this.z = Infinity;
				this.name = 'HUD';
				this.addChild(new YearsLeft(me.game.world.width / 2, 10));
				this.addChild(new WaterLevel(me.game.world.width - 10, 10));
			}
		})
	};

	return Hud;
})