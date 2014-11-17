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

var up = new pc.asset.Asset('up', "texture", {
	url: 'assets/space_up.png'
});
var down = new pc.asset.Asset('down', "texture", {
	url: 'assets/space_down.png'
});
var left = new pc.asset.Asset('left', "texture", {
	url: 'assets/space_left.png'
});
var right = new pc.asset.Asset('right', "texture", {
	url: 'assets/space_right.png'
});
var back = new pc.asset.Asset('back', "texture", {
	url: 'assets/space_back.png'
});
var front = new pc.asset.Asset('front', "texture", {
	url: 'assets/space_front.png'
});


app.context.assets.addAsset(up);
app.context.assets.addAsset(down);
app.context.assets.addAsset(left);
app.context.assets.addAsset(right);
app.context.assets.addAsset(front);
app.context.assets.addAsset(back);

app.context.systems.skybox.addComponent(skybox, {
	enabled: true,
	posx: right.id,
	negx: left.id,
	posy: up.id,
	negy: down.id,
	posz: front.id,
	negz: back.id
});	

//Create cone entity
var cone = new pc.fw.Entity();
app.context.systems.model.addComponent(cone, {
	type: "cone",
});

var material = new pc.scene.PhongMaterial();
material.diffuse = new pc.Color(1.0, 0.2, 1.0, 1.0);
material.update();

cone.model.material = material;

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
