// Create a PlayCanvas application
var canvas = document.getElementById("application-canvas");
var app = new pc.fw.Application(canvas, {});
var keyboard = new pc.input.Keyboard(window); 

app.start();

// Fill the available space at full resolution
app.setCanvasFillMode(pc.fw.FillMode.FILL_WINDOW);
app.setCanvasResolution(pc.fw.ResolutionMode.AUTO);

app.context.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);

// Bit of hack to enable crossOrigin texure loading
app.context.loader._handlers['texture'].crossOrigin = 'anonymous';

//Create skybox entity
var skybox = new pc.fw.Entity();

//Create cone entity
var cone = new pc.fw.Entity();
app.context.systems.model.addComponent(cone, {
	type: "cone",
});

//Create floor entity
var floor = new pc.fw.Entity();
app.context.systems.model.addComponent(floor, {
	type: "box",
});

// Create camera entity
var cam = new pc.fw.Entity();
app.context.systems.camera.addComponent(cam, {
	clearColor: [0.3,0.3,0.3]
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

	var coneMaterial = new pc.scene.PhongMaterial();
	coneMaterial.diffuse = new pc.Color(1.0, 0.2, 1.0, 1.0);
	coneMaterial.update();

	cone.model.material = coneMaterial;

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
app.context.root.addChild(floor);
app.context.root.addChild(cam);
app.context.root.addChild(light);
app.context.root.addChild(skybox);

// Set up position and orientation
cone.setLocalPosition(0,0.5,0);
floor.setLocalScale(2,0.1,2);
floor.setLocalPosition(0,-0.1,0);
cam.setLocalPosition(0, 10, 20);
cam.setEulerAngles(-30,0,0);
light.setEulerAngles(0, 0, 30);


// Register an update event
app.on("update", function (dt) {
	
	const MULT =  5;

	if (keyboard.isPressed(pc.input.KEY_W)) {
		cone.translateLocal(0, +dt*MULT, 0);
	}
	if (keyboard.isPressed(pc.input.KEY_S)) {
		cone.translateLocal(0, -dt*MULT, 0);
	}
	if (keyboard.isPressed(pc.input.KEY_A)) {
		cone.rotateLocal(0, 0, +45*dt*MULT);
	}
	if (keyboard.isPressed(pc.input.KEY_D)) {
		cone.rotateLocal(0, 0, -45*dt*MULT);
	}
	if (keyboard.isPressed(pc.input.KEY_E)) {
		cone.rotate(+45*dt*MULT, 0, 0);
	}
	if (keyboard.isPressed(pc.input.KEY_Q)) {
		cone.rotate(-45*dt*MULT, 0, 0);
	}

	if (keyboard.isPressed(pc.input.KEY_LEFT)) {
		cam.rotate(0, 100*dt, 0);
	}
	if (keyboard.isPressed(pc.input.KEY_RIGHT)) {
		cam.rotate(0, -100*dt, 0);
	}
	if (keyboard.isPressed(pc.input.KEY_UP)) {
		cam.rotate(-100*dt, 0, 0);
	}
	if (keyboard.isPressed(pc.input.KEY_DOWN)) {
		cam.rotate(100*dt, 0, 0);
	}
});
