define(['entities/tools/waterTool', 'entities/tools/meltTool', 'entities/tools/poisonTool', 'entities/log', 'entities/glacier', 'hud'],
	function(WaterTool, MeltTool, PoisonTool, Log, Glacier, Hud) {
		'use strict';

		var Character = me.ObjectEntity.extend({
			init: function(x, y, settings) {
				this.parent(x, y, settings);
				this.setVelocity(3, 15);
				this.updateColRect(10, 12, -1, 0);

				// This is for a little delay until anStill is being set
				this.renderable.addAnimation('anStill', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5]);
				this.renderable.addAnimation('anRight', [6, 7, 8, 9, 10, 11]);
				this.renderable.addAnimation('anJump', [12, 13, 14, 15, 16, 17]);

				this.direction = 'right';

				// We need it so when the character falls too quickly,
				// the death by water check can still be done.
				this.alwaysUpdate = true;
				this.tools = [];
			},
			updateSound: function() {
				var _this = this;

				if (this.vel.x != 0){
					if (!this.playing && !this.jumping && !this.falling) {
						this.playing = true;

						me.audio.play('step', false, function() {
							_this.playing = false;
						});
					}
				}
			},
			updateAnimation: function(){
				if (this.vel.x != 0){
					if (this.direction == 'right' && !this.renderable.isCurrentAnimation('anRight')) {
						this.renderable.setCurrentAnimation('anRight');
						this.flipX(false);
					} else if (this.direction == 'left' && !this.renderable.isCurrentAnimation('anRight')) {
						this.renderable.setCurrentAnimation('anRight');
						this.flipX(true);
					}
				} else if (!this.renderable.isCurrentAnimation('anStill')) {
					this.renderable.setCurrentAnimation('anStill');
				}

				if (this.jumping) {
					this.renderable.setCurrentAnimation('anJump');
				}
			},
			update: function() {
				if (this.isDead()) {
					me.game.viewport.fadeIn('#000', 100, function() {
						me.levelDirector.reloadLevel();
						me.game.viewport.fadeOut('#000', 100);
					});
					return;
				}

				if (me.input.isKeyPressed('left')) {
					this.direction = 'left';
					this.vel.x -= this.accel.x * me.timer.tick;
				} else if (me.input.isKeyPressed('right')) {
					this.direction = 'right';
					this.vel.x += this.accel.x * me.timer.tick;
				} else {
					this.vel.x = 0;
				}

				if (me.input.isKeyPressed('jump')) {
					if (!this.jumping && !this.falling) {
						this.vel.y = -this.maxVel.y * me.timer.tick;
						this.jumping = true;
					}
				}

				if (me.input.isKeyPressed('waterTool') && this.waterTool) {
					this.waterTool.use();
				}

				if (me.input.isKeyPressed('meltTool') && this.meltTool) {
					this.meltTool.use();
				}

				if (me.input.isKeyPressed('poisonTool') && this.poisonTool) {
					this.poisonTool.use();
				}

				this.updateSound();
				this.updateMovement();
				this.updateAnimation();
				this.handleCollisions();
				this.parent();

				if (this.vel.x!=0 || this.vel.y!=0) {
					return true;
				}

				return false;
			},
			handleCollisions: function() {
				var res = this.collide();

				if (!res) {
					return;
				}

				if (res.obj instanceof Log || res.obj instanceof Glacier) {
					this.pos.x -= res.x;
					this.pos.y -= res.y;

					if (res.y > 0) {
						this.jumping = false;
						this.falling = false;
						this.vel.y = 0;
					}
				}

				// TODO: Unify these if possible (`instanceof Tool`)
				if (res.obj instanceof WaterTool) {
					me.audio.play("newTool", false, null, 0.4);
					this.addTool('water', res.obj);
				}

				if (res.obj instanceof MeltTool) {
					me.audio.play("newTool", false, null, 0.4);
					this.addTool('melt', res.obj);
				}

				if (res.obj instanceof PoisonTool) {
					me.audio.play("newTool", false, null, 0.4);
					this.addTool('poison', res.obj);
				}
			},
			isDead: function() {
				// Check for each possible death condition here

				// is under water
				if (me.state.current().water.isOver(this)) {
					return true;
				}

				// collides with enemy
				var res = this.collide();
				if (res && res.obj.type === me.game.ENEMY_OBJECT) {
					return true;
				}

				return false;
			},
			center: function() {
				return {
					x: this.pos.x + this.width / 2,
					y: this.pos.y + this.height / 2
				};
			},
			onDestroyEvent: function() {
				_.each(this.tools, function(tool) {
					tool.stop();
				});
			},
			addTool: function(name, tool) {
				this[name + 'Tool'] = tool;
				tool.character = this;
				this.tools.push(tool);
				me.state.current().hud.addTool(tool);
			}
		});

		return Character;
	}
);
