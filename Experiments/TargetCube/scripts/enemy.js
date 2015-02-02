pc.script.create("enemy", function (context) {

    const MULT = 25;
    const MAX_TIME = 2;

    var enemyScript = function (entity) {
        this.entity = entity;
    };

    enemyScript.prototype = {
        initialize: function () {

        },

        update: function (dt) {

        }
    }

    return enemyScript;

});
