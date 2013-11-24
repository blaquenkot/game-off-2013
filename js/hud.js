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

	var Hud = {
		Container: me.ObjectContainer.extend({
			init: function() {
				this.parent();
				this.isPersistent = true;
				this.collidable = false;
				this.z = Infinity;
				this.name = 'HUD';
				this.addChild(new YearsLeft(me.game.world.width / 2, 10));
			}
		})
	};

	return Hud;
})