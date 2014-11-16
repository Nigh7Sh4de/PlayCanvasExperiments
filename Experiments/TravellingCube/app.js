// Create a PlayCanvas application
var canvas = document.getElementById("application-canvas");
var app = new pc.fw.Application(canvas, {});
var keyboard = new pc.input.Keyboard(window); 

app.start();

// Fill the available space at full resolution
app.setCanvasFillMode(pc.fw.FillMode.FILL_WINDOW);
app.setCanvasResolution(pc.fw.ResolutionMode.AUTO);

app.context.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);

// Create box entity
var box = new pc.fw.Entity();
app.context.systems.model.addComponent(box, {
	type: "box",
});

var material = new pc.scene.PhongMaterial();
material.diffuse = new pc.Color(1.0, 0.2, 1.0, 1.0);
material.update();

box.model.material = material;

//Create floor entity
var floor = new pc.fw.Entity();
app.context.systems.model.addComponent(floor, {
	type: "box",
});

app.context.assets.loadFromUrl("assets/Hex_Plating.png", "texture").then(function (result) {
	var texture = result.resource[0];
	var material = new pc.scene.PhongMaterial();
	material.diffuseMap = texture;
	material.update();
	floor.model.model.meshInstances[0].material = material;
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

// Add to hierarchy
app.context.root.addChild(box);
app.context.root.addChild(floor);
app.context.root.addChild(cam);
app.context.root.addChild(light);

// Set up position and orientation
box.setLocalPosition(0,0.5,0);
floor.setLocalScale(10,0.1,10);
floor.setLocalPosition(0,-0.1,0);
cam.setLocalPosition(0, 5, 10);
cam.setEulerAngles(-30,0,0);
light.setEulerAngles(0, 0, 30);

// Register an update event
app.on("update", function (dt) {
	
	if (keyboard.isPressed(pc.input.KEY_W)) {
		box.translate(0,0, -2*dt);
	}
	if (keyboard.isPressed(pc.input.KEY_S)) {
		box.translate(0, 0, 2*dt);
	}
	if (keyboard.isPressed(pc.input.KEY_A)) {
		box.translate(-2*dt,0,0);
	}
	if (keyboard.isPressed(pc.input.KEY_D)) {
		box.translate(+2*dt,0,0);
	}
});
