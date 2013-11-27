define([], function() {
	'use strict';

	var HintBox = me.ObjectContainer.extend({
		init: function(x, y, name) {
			this.parent();
			this.x = x;
			this.y = y;
			this.z = Infinity;
			this.message = new me.SpriteObject(x, y, me.loader.getImage(name));
			this.message.alpha = 0;
		},
		show: function() {
			var messageAlphaTween = new me.Tween(this.message).to({alpha: 1}, 300),
					messagePositionTween = new me.Tween(this.message.pos).to({y: this.message.pos.y}, 300);
			this.message.pos.y += 5;
			this.addChild(this.message);
			messageAlphaTween.start();
			messagePositionTween.start();
			me.game.add(this);
		},
		hide: function() {
			console.log('closing the hint');
		}
	});

	return HintBox;
});
