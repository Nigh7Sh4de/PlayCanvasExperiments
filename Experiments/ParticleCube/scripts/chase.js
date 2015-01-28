pc.script.attribute('target', 'string', 'some dummy text that is not an actual name');

pc.script.create("chase", function (context) {
    var chaseScript = function (entity) {
        this.entity = entity;
        this.targetEntity = null;
        this.targetPosition = null;
        this.targetRotation = null;
    };

    chaseScript.prototype = {
        initialize: function () {
            this.targetEntity = context.root.findByName(this.target);
        },

        update: function (dt) {


            if (JSON.stringify(this.targetRotation) !== JSON.stringify(this.targetEntity.getLocalRotation()) ||
                JSON.stringify(this.targetPosition) !== JSON.stringify(this.targetEntity.getPosition())) {

                this.entity.setLocalRotation(this.targetEntity.getLocalRotation());
                this.entity.rotateLocal(0, 180, 0);

                this.entity.setPosition(this.targetEntity.getPosition());
                this.entity.translateLocal(0, 0, 0.3);
                //                this.entity.rotateLocal(-30, 0, 0);
            }

            this.targetPosition = this.targetEntity.getPosition().clone();
            this.targetRotation = this.targetEntity.getLocalRotation().clone();
        }
    };

    return chaseScript;
});