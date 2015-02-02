pc.script.create("spawn", function (context) {

    const INTERVAL = 3;

    var spawnScript = function (entity) {
        this.entity = entity;
        this.time = 0;


    };

    spawnScript.prototype = {
        initialize: function () {
            this.time = 0;

            this.spawnEnemy();

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

            enemy.setLocalScale(1, 1, 1);

            context.systems.model.addComponent(enemy, {
                type: "box",
            });

            //            enemy.setLocalScale(0.5, 0.5, 0.1);

            context.systems.rigidbody.addComponent(enemy, {
                type: 'dynamic',
                mass: 1
            });

            app.context.systems.collision.addComponent(enemy, {
                type: "box",
                halfExtents: new pc.Vec3(0.5, 0.5, 0.5)
            });


            var material = new pc.scene.PhongMaterial();
            material.diffuse = new pc.Color(1.0, 0.0, 0.0, 1.0);
            material.update();

            enemy.model.material = material;

            var enemyScript = {
                url: 'scripts/enemy.js',
                name: 'enemy'
            }

            context.systems.script.addComponent(enemy, {
                enabled: true,
                scripts: [enemyScript]
            });


            context.root.addChild(enemy);

        }
    };

    return spawnScript;

});
