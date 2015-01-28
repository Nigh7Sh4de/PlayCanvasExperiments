pc.script.create("bullet", function (context) {

    var stupidFuckingFix_bulletArray = [];

    const MULT = 1;
    const MAX_TIME = 2;

    var bulletScript = function (entity) {
        entity.time = 0;
        this.entity = entity;
    };

    bulletScript.prototype = {
        initialize: function () {

        },

        update: function (dt) {
            this.entity.time += dt;
            if (this.entity.time < MAX_TIME)
                this.entity.translateLocal(0, 0, dt * MULT);
            else {
                this.entity.translateLocal(0, dt * MULT, 0);
            }
        }
    }

    return bulletScript;

});