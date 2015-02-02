pc.script.create("shoot", function (context) {

    var shootScript = function (entity) {
        this.entity = entity;

        context.mouse.on(pc.input.EVENT_MOUSEDOWN, this.onMouseDown, this);
    };

    shootScript.prototype = {
        initialize: function () {

        },

        update: function (dt) {
            if (context.keyboard.wasPressed(pc.input.KEY_SPACE)) {
                this.createBullet();

            }
        },

        onMouseDown: function (event) {
            // When the mouse button is clicked try and capture the pointer
            if (!pc.Mouse.isPointerLocked())
                context.mouse.enablePointerLock();
            else
                this.createBullet();

        },

        createBullet: function () {
            var newBullet = new pc.fw.Entity();

            context.systems.model.addComponent(newBullet, {
                type: "box",
            });

            newBullet.setRotation(this.entity.getRotation());
            newBullet.setLocalScale(0.04, 0.04, 0.2);
            newBullet.setPosition(this.entity.getPosition());
            newBullet.translateLocal(0, 0.1523, 0);

            context.systems.rigidbody.addComponent(newBullet, {
                type: 'dynamic',
                mass: 0.1,
                restitution: 0.5
            });

            app.context.systems.collision.addComponent(newBullet, {
                type: "box",
                halfExtents: newBullet.getLocalScale()
            });


            var material = new pc.scene.PhongMaterial();
            material.diffuse = new pc.Color(0.0, 0.5, 0.0, 1.0);
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

        }
    };

    return shootScript;

});
