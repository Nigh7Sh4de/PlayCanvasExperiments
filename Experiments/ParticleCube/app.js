// Create a PlayCanvas application
var canvas = document.getElementById("application-canvas");
canvas.focus();

var app = new pc.fw.Application(canvas, {
	mouse: new pc.input.Mouse(canvas),
	keyboard: new pc.input.Keyboard(canvas)
});

app.start();

// Fill the available space at full resolution
app.setCanvasFillMode(pc.fw.FillMode.FILL_WINDOW);
app.setCanvasResolution(pc.fw.ResolutionMode.AUTO);

app.context.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);

// Bit of hack to enable crossOrigin texure loading
app.context.loader._handlers['texture'].crossOrigin = 'anonymous';
app.context.loader._handlers['model'].crossOrigin = 'anonymous';

//Create skybox entity
var skybox = new pc.fw.Entity();

// Create box entity
var cone = new pc.fw.Entity();

cone.setName('cone');

var url = "assets/leonardo-da-vinci-flying-machine.json";

app.context.assets.loadFromUrl(url, "model").then(function (results) {
	var model = results.resource;
	var asset = results.asset;

	app.context.systems.model.addComponent(cone, {
		type: "asset",
		asset: asset
	});
});

var moveScript = {
	url: 'scripts/move.js',
	name: 'move'
}

var lookScript = {
	url: 'scripts/look.js',
	name: 'look'
}

app.context.systems.script.addComponent(cone, {
	enabled: true,
	scripts: [moveScript, lookScript]
});


//Create floor entity
var floor = new pc.fw.Entity();
app.context.systems.model.addComponent(floor, {
	type: "box",
});

//Create ceiling entity
var ceil = new pc.fw.Entity();
	app.context.systems.model.addComponent(ceil, {
	type: "box",
});

var material = new pc.scene.PhongMaterial();
material.diffuse = new pc.Color(1.0, 1.0, 0.0, 1.0);
material.update();

ceil.model.material = material;


// Create camera entity
var cam = new pc.fw.Entity();
app.context.systems.camera.addComponent(cam, {
	clearColor: [0.3,0.3,0.3]
});

var chaseScript = {
	url: 'scripts/chase.js',
	name: 'chase',
	attributes: [{
		name: 'target',
		type: 'string',
		value: 'cone'
	}]
}

app.context.systems.script.addComponent(cam, {
	enabled: true,
	scripts: [chaseScript]
});

// Create directional light entity
var light = new pc.fw.Entity();
app.context.systems.light.addComponent(light, {
	color: new pc.Color(1,1,1)
});


// load all textures
var textures = [
    "assets/space_up.png",
    "assets/space_down.png",
    "assets/space_left.png",
    "assets/space_right.png",
    "assets/space_front.png",
    "assets/space_back.png",
    "assets/Hex_Plating.png"
];

var promises = [];

for (var i = 0; i < textures.length; i++) {
  promises.push(app.context.assets.loadFromUrl(textures[i], "texture"));
}

// check for all assets to load then create skybox
pc.promise.all(promises).then(function (results) {

	var floorMaterial = new pc.scene.PhongMaterial();
	floorMaterial.diffuseMap = results[6].resource[0];
	floorMaterial.update();
	floor.model.model.meshInstances[0].material = floorMaterial;

	app.context.systems.skybox.addComponent(skybox, {
		enabled: true,
		posx: results[0].asset.id,
		negx: results[1].asset.id,
		posy: results[2].asset.id,
		negy: results[3].asset.id,
		posz: results[4].asset.id,
		negz: results[5].asset.id
	});	
});


// Add to hierarchy
app.context.root.addChild(cone);
app.context.root.addChild(ceil);
app.context.root.addChild(floor);
app.context.root.addChild(cam);
app.context.root.addChild(light);
app.context.root.addChild(skybox);

//Set up relations


// Set up position and orientation
cone.setLocalScale(0.0005, 0.0005, 0.0005);
cone.setLocalPosition(0,0,0);
ceil.setLocalScale(2,0.1,2);
ceil.setLocalPosition(0, 2.1, 0);
floor.setLocalScale(2,0.1,2);
floor.setLocalPosition(0,-0.1,0);
cam.setLocalPosition(0, 10, 20);
cam.setEulerAngles(-30,0,0);
light.setEulerAngles(0, 0, 30);


// Register an update event
app.on("update", function (dt) {
	
});
