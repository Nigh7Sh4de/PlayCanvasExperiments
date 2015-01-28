pc.script.create("shoot", function (context) {

    var shootScript = function (entity) {
        this.entity = entity;


    };

    shootScript.prototype = {
        initialize: function () {

        },

        update: function (dt) {
            if (context.keyboard.wasPressed(pc.input.KEY_SPACE)) {

                var newBullet = new pc.fw.Entity();

                context.systems.model.addComponent(newBullet, {
                    type: "box",
                });

                var material = new pc.scene.PhongMaterial();
                material.diffuse = new pc.Color(0.0, 1.0, 0.0, 1.0);
                material.update();

                newBullet.model.material = material;

                var bulletScript = {
                    url: 'scripts/bullet.js',
                    name: 'bullet'
                }

                context.systems.script.addComponent(newBullet, {
                    enabled: true,
                    scripts: [bulletScript]
                });


                context.root.addChild(newBullet);

                newBullet.setPosition(this.entity.getPosition().add(new pc.Vec3(0, 0.05, 0)));
                newBullet.setLocalRotation(this.entity.getLocalRotation());
                newBullet.setLocalScale(0.01, 0.01, 0.1);
            }
        }
    };

    return shootScript;

});