pc.script.create("move", function (context) {

    const MULT =  5;

    var chaseScript = function (entity) {
        this.entity = entity;
    };

    chaseScript.prototype = {
        initialize: function () {

        },

        update: function (dt) {


            if (keyboard.isPressed(pc.input.KEY_W)) {
                this.entity.translateLocal(0, 0, +dt*MULT);
            }
            if (keyboard.isPressed(pc.input.KEY_S)) {
                this.entity.translateLocal(0, 0, -dt*MULT);
            }
            if (keyboard.isPressed(pc.input.KEY_A)) {
                this.entity.rotateLocal(0, +45*dt*MULT, 0);
            }
            if (keyboard.isPressed(pc.input.KEY_D)) {
                this.entity.rotateLocal(0, -45*dt*MULT, 0);
            }
            if (keyboard.isPressed(pc.input.KEY_E)) {
                this.entity.rotateLocal(+45*dt*MULT, 0, 0);
            }
            if (keyboard.isPressed(pc.input.KEY_Q)) {
                this.entity.rotateLocal(-45*dt*MULT, 0, 0);
            }
        }
    };

    return chaseScript;
});