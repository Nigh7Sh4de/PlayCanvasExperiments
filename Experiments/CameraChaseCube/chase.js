pc.script.attribute('target', 'string', 'some dummy text that is not an actual name');

pc.script.create("chase", function (context) {
    var chaseScript = function (entity) {
        this.entity = entity;
        this.fixedRotate = true;
        this.targetEntity = null;
        
    };

    chaseScript.prototype = {
        initialize: function () {
            this.targetEntity = context.root.findByName(this.target);
            
        },

        update: function (dt) {

            if (keyboard.wasPressed(pc.input.KEY_SPACE)) {
                this.fixedRotate = !this.fixedRotate;
            }
            
            if (JSON.stringify(this.entity.getPosition()) != JSON.stringify(this.targetEntity.getPosition())) {
                this.entity.setPosition(this.targetEntity.getPosition())
            }
            
            if (JSON.stringify(this.entity.getLocalRotation()) != JSON.stringify(this.targetEntity.getLocalRotation())) {
                this.entity.setLocalRotation(this.targetEntity.getLocalRotation());
                this.entity.rotateLocal(0, 180, 0);
            }
            
        }
    };

    return chaseScript;
});