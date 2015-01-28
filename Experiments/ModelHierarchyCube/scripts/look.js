pc.script.create("look", function (context) {

    const MULT = 0.5;

    var lookScript = function (entity) {
        this.entity = entity;

        var angles = entity.getLocalEulerAngles();

        this.ex = angles.x;
        this.ey = angles.y;

        context.mouse.on(pc.input.EVENT_MOUSEMOVE, this.onMouseMove, this);
    };

    lookScript.prototype = {
        initialize: function () {

        },

        update: function (dt) {
            this.entity.setLocalEulerAngles(this.ex, this.ey, 0);
        },

        onMouseMove: function (event) {
            this.ex += event.dy * MULT;
            this.ex = pc.math.clamp(this.ex, -90, 90);
            this.ey -= event.dx * MULT;

            this.entity.setLocalEulerAngles(this.ex, this.ey, 0);
        }

    };

    return lookScript;

});