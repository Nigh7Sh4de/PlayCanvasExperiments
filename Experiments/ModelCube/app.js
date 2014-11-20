// Create a PlayCanvas application
var canvas = document.getElementById("application-canvas");
var app = new pc.fw.Application(canvas, {});
var keyboard = new pc.input.Keyboard(window); 

app.start();

// Fill the available space at full resolution
app.setCanvasFillMode(pc.fw.FillMode.FILL_WINDOW);
app.setCanvasResolution(pc.fw.ResolutionMode.AUTO);

// Create box entity
var e = new pc.fw.Entity();

var url = "assets/leonardo-da-vinci-flying-machine.json";

app.context.assets.loadFromUrl(url, "model").then(function (results) {
	var model = results.resource;
	var asset = results.asset;

	app.context.systems.model.addComponent(e, {
		type: "asset",
		asset: asset
	});
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
app.context.root.addChild(e);
app.context.root.addChild(cam);
app.context.root.addChild(light);

// Set up position and orientation
e.setLocalScale(0.001, 0.001, 0.001);
cam.setLocalPosition(0, 0, 3);
light.setEulerAngles(45, 0, 0);

// Register an update event
app.on("update", function (dt) {
	
	if (keyboard.isPressed(pc.input.KEY_LEFT)) {
        cam.rotateLocal(0, 90*dt, 0);
	}
	if (keyboard.isPressed(pc.input.KEY_RIGHT)) {
        cam.rotateLocal(0, -90*dt, 0);
	}
	if (keyboard.isPressed(pc.input.KEY_UP)) {
        cam.rotateLocal(90*dt, 0, 0);
	}
	if (keyboard.isPressed(pc.input.KEY_DOWN)) {
        cam.rotateLocal(-90*dt, 0, 0);
	}

    if (keyboard.isPressed(pc.input.KEY_W)) {
        cam.translateLocal(0, 0, -1*dt);
    }
    if (keyboard.isPressed(pc.input.KEY_S)) {
        cam.translateLocal(0, 0, 1*dt);
    }
    if (keyboard.isPressed(pc.input.KEY_D)) {
        cam.translateLocal(1*dt, 0, 0);
    }
    if (keyboard.isPressed(pc.input.KEY_A)) {
        cam.translateLocal(-1*dt, 0, 0);
    }

});
