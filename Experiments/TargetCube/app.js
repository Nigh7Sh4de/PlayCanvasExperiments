// Create a PlayCanvas application
var canvas = document.getElementById("application-canvas");
canvas.focus();

var app = new pc.fw.Application(canvas, {
    mouse: new pc.input.Mouse(canvas),
    keyboard: new pc.input.Keyboard(canvas)
});

app.context.loader._handlers['texture'].crossOrigin = 'anonymous';
app.context.loader._handlers['model'].crossOrigin = 'anonymous';

app.start();

// Fill the available space at full resolution
app.setCanvasFillMode(pc.fw.FillMode.FILL_WINDOW);
app.setCanvasResolution(pc.fw.ResolutionMode.AUTO);

app.context.systems.rigidbody.setGravity(0, -10, 0);

// Create camera entity
var cam = new pc.fw.Entity();
app.context.systems.camera.addComponent(cam, {
    clearColor: [0.3, 0.3, 0.3]
});

cam.setLocalPosition(0, 3, -9);
cam.rotateLocal(-5, 180, 0);

// Create directional light entity
var light = new pc.fw.Entity();
app.context.systems.light.addComponent(light, {
    color: new pc.Color(1, 1, 1)
});

light.setEulerAngles(45, 0, 0);


// Create tank entity
var tank = new pc.fw.Entity();
tank.rotate(0, 180, 0);

var base = new pc.fw.Entity();

var gun = new pc.fw.Entity();
gun.translateLocal(0, 0.55, 0);

var url = "assets/Tank_base.json";

app.context.assets.loadFromUrl(url, "model").then(function (results) {
    var model = results.resource;
    var asset = results.asset;

    app.context.systems.model.addComponent(base, {
        type: "asset",
        asset: asset
    });
});

url = "assets/Tank_gun_turret.json";

app.context.assets.loadFromUrl(url, "model").then(function (results) {
    var model = results.resource;
    var asset = results.asset;

    app.context.systems.model.addComponent(gun, {
        type: "asset",
        asset: asset
    });
});

var lookScript = {
    name: 'look',
    url: 'scripts/look.js'
}

var shootScript = {
    name: 'shoot',
    url: 'scripts/shoot.js'
}

app.context.systems.script.addComponent(gun, {
    enabled: true,
    scripts: [lookScript, shootScript]
});

var moveScript = {
    name: 'move',
    url: 'scripts/move.js'
}

app.context.systems.script.addComponent(tank, {
    enable: true,
    scripts: [moveScript]
});

tank.addChild(base);
tank.addChild(gun);
gun.addChild(cam);



//Create a floor
var floor = new pc.fw.Entity();

//floor.setLocalScale(100, 1, 100);
floor.setLocalScale(10, 1, 10);

app.context.systems.model.addComponent(floor, {
    type: "box",
});

app.context.systems.rigidbody.addComponent(floor, {
    type: 'static'
});

//var scale = floor.getLocalScale().clone();
//console.log(scale);
//scale = scale.scale(0.5);
//console.log(scale);

app.context.systems.collision.addComponent(floor, {
    type: 'box',
//    halfExtents: ,
    halfExtents: new pc.Vec3(5, 0.5, 5)
});

floor.translate(0, -0.5, 0);
floor.rigidbody.syncEntityToBody();

//Create an enemy spawner
var spawner = new pc.fw.Entity();

var spawnScript = {
    name: 'spawn',
    url: 'scripts/spawn.js'
}

app.context.systems.script.addComponent(spawner, {
    enabled: true,
    scripts: [spawnScript]
});


// Create directional light entity
var light = new pc.fw.Entity();
app.context.systems.light.addComponent(light, {
    color: new pc.Color(1, 1, 1)
});

    // load all textures
var textures = [
    "assets/Hex_Plating.png"
];

var promises = [];

for (var i = 0; i < textures.length; i++) {
  promises.push(app.context.assets.loadFromUrl(textures[i], "texture"));
}

// check for all assets to load then create skybox
pc.promise.all(promises).then(function (results) {

	var floorMaterial = new pc.scene.PhongMaterial();
	floorMaterial.diffuseMap = results[0].resource[0];
	floorMaterial.update();
	floor.model.model.meshInstances[0].material = floorMaterial;

});


// Add to hierarchy
app.context.root.addChild(tank);
app.context.root.addChild(light);
app.context.root.addChild(floor);
