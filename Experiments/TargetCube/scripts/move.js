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
            console.log(this.initY);
        },

        update: function (dt) {

            var initPos = this.entity.getPosition().clone();

            if (context.keyboard.isPressed(pc.input.KEY_W)) {
                this.entity.translateLocal(0, 0, +dt * MULT);
            }
            if (context.keyboard.isPressed(pc.input.KEY_S)) {
                this.entity.translateLocal(0, 0, -dt * MULT);
            }
            if (context.keyboard.isPressed(pc.input.KEY_A)) {
                this.entity.rotateLocal(0, +dt * ROTATEMULT, 0);
            }
            if (context.keyboard.isPressed(pc.input.KEY_D)) {
                this.entity.rotateLocal(0, -dt * ROTATEMULT, 0);
            }

            var finalPos = this.entity.getPosition().clone();

            if (JSON.stringify(initPos) != JSON.stringify(finalPos)) { // It moved!?
                this.entity.setPosition(finalPos.mul(new pc.Vec3(1, 0, 1)).add(new pc.Vec3(0, this.initY, 0)));
            }
        }
    };

    return moveScript;
});