// Create a PlayCanvas application
var canvas = document.getElementById("application-canvas");
var app = new pc.fw.Application(canvas, {});
app.start();

// Fill the available space at full resolution
app.setCanvasFillMode(pc.fw.FillMode.FILL_WINDOW);
app.setCanvasResolution(pc.fw.ResolutionMode.AUTO);

// Create box entity
var e = new pc.fw.Entity();
app.context.systems.model.addComponent(e, {
type: "box",
});

var material = new pc.scene.PhongMaterial();
material.diffuse = new pc.Color(1.0, 0.2, 1.0, 1.0);
material.update();

e.model.material = material;


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
cam.setLocalPosition(0, 0, 3);
light.setEulerAngles(45, 0, 0);

// Register an update event
app.on("update", function (dt) {
	
	

});
