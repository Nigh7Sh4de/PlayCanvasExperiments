pc.script.create("chase", function (context) {
    var chaseScript = function (entity) {
        this.entity = entity;
        this.targetName = '';
        this.targetEntity = null;
        
    };

    chaseScript.prototype = {
        set targetName(value) {
            this.targetEntity = context.root.findByName(this.targetName);
            this.targetName = value;
        },

        initialize: function () {

        },

        update: function (dt) {
            // this.entity.translateLocal(0, 0, -dt);
            // console.log(this.targetEntity);//.getPosition());
        }
    };

    return chaseScript;
});