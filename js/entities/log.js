define(['buoyant'], function(Buoyant) {
  var Log = Buoyant.extend({
    init: function(x, y, settings) {
      settings = settings || {};

      settings.type = 'solid';
      settings.image = 'log';
      this.parent(x, y, settings);
    },
    onCollision: function(res, obj) {
      console.log(res, obj);
    }
  });

  return Log;
});