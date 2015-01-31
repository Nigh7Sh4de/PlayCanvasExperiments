pc.script.create("spawn", function (context) {

    const INTERVAL = 3;

    var spawnScript = function (entity) {
        this.entity = entity;
        this.time = 0;


    };

    spawnScript.prototype = {
        initialize: function () {
            this.time = 0;
        },

        update: function (dt) {
            this.time += dt;
            if (this.time > INTERVAL) {
                this.time = 0;
                this.spawnEnemy();
            }
        },

        spawnEnemy: function () {
            var enemy = new pc.fw.Entity();

            context.systems.model.addComponent(enemy, {
                type: "box",
            });

            var material = new pc.scene.PhongMaterial();
            material.diffuse = new pc.Color(1.0, 0.0, 0.0, 1.0);
            material.update();

            enemy.model.material = material;

            //            var bulletScript = {
            //                url: 'scripts/bullet.js',
            //                name: 'bullet'
            //            }
            //
            //            context.systems.script.addComponent(enemy, {
            //                enabled: true,
            //                scripts: [bulletScript]
            //            });


            context.root.addChild(enemy);

            //            enemy.setRotation(this.entity.getRotation());
            enemy.setLocalScale(0.5, 0.5, 0.1);
            //            enemy.setPosition(this.entity.getPosition());
            //            enemy.translateLocal(0, 0.1523, 0);
        }
    };

    return spawnScript;

});