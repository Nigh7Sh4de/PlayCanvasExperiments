pc.script.create("look", function (context) {

    const MULT = 0.25;

    var lookScript = function (entity) {
        this.entity = entity;

        var angles = entity.getLocalEulerAngles();

        this.ex = angles.x;
        this.ey = angles.y;

        context.mouse.on(pc.input.EVENT_MOUSEMOVE, this.onMouseMove, this);
        context.mouse.on(pc.input.EVENT_MOUSEDOWN, this.onMouseDown, this);
    };

    lookScript.prototype = {
        initialize: function () {

        },

        update: function (dt) {
            this.entity.setEulerAngles(this.ex, this.ey, 0);
        },

        onMouseMove: function (event) {
            this.ex += event.dy * MULT;
            this.ex = pc.math.clamp(this.ex, -90, 90);
            this.ey -= event.dx * MULT;

            //            this.entity.setLocalEulerAngles(this.ex, this.ey, 0);
        },

        onMouseDown: function (event) {
            // When the mouse button is clicked try and capture the pointer
            console.log('mouse clicked');
            if (!pc.Mouse.isPointerLocked()) {
                console.log('Attempting to lock point');
                context.mouse.enablePointerLock();
            }
        }

    };

    return lookScript;

});