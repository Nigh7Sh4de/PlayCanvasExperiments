pc.script.create("move", function (context) {

    const MULT = 2;
    const ROTATEMULT = MULT * 90;

    var moveScript = function (entity) {
        this.entity = entity;
        this.initY = 0;
    };

    moveScript.prototype = {
        initialize: function () {
            this.initY = this.entity.getPosition().y;
        },

        update: function (dt) {

            var boost = 1;
            if (context.keyboard.isPressed(pc.input.KEY_SHIFT)) {
                boost = 3;
            }
            if (context.keyboard.isPressed(pc.input.KEY_W)) {
                this.entity.translateLocal(0, 0, +dt * MULT * boost);
            }
            if (context.keyboard.isPressed(pc.input.KEY_S)) {
                this.entity.translateLocal(0, 0, -dt * MULT * boost);
            }
            if (context.keyboard.isPressed(pc.input.KEY_A)) {
                this.entity.rotateLocal(0, +dt * ROTATEMULT, 0 * boost);
            }
            if (context.keyboard.isPressed(pc.input.KEY_D)) {
                this.entity.rotateLocal(0, -dt * ROTATEMULT, 0 * boost);
            }
        }
    };

    return moveScript;
});
