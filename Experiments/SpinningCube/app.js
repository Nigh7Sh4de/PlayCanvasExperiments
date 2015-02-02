//Create a PlayCanvas application
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

app.context.systems.rigidbody.addComponent(e, {
    type: "dynamic",
    mass: 1,
    restitution: 0.5
});
// add a collision component
app.context.systems.collision.addComponent(e, {
    type: "box",
    halfExtents: new pc.Vec3(5, 0.5, 5)
});

var material = new pc.scene.PhongMaterial();
material.diffuse = new pc.Color(1.0, 1.0, 0.0, 1.0);
material.update();

e.model.material = material;

// Create camera entity
var cam = new pc.fw.Entity();
app.context.systems.camera.addComponent(cam, {
    clearColor: [0.1, 0.1, 0.1]
});

// Create directional light entity
var light = new pc.fw.Entity();
app.context.systems.light.addComponent(light, {
    color: new pc.Color(1, 1, 1)
});

// Add to hierarchy
app.context.root.addChild(e);
app.context.root.addChild(cam);
app.context.root.addChild(light);

// Set up position and orientation
cam.setLocalPosition(0, 0, 3);
light.setEulerAngles(45, 0, 0);

e.rigidbody.syncEntityToBody();

// Register an update event
app.on("update", function (dt) {
    console.log(e.rigidbody.isActive());
    if (!e.rigidbody.isActive()) {
        console.log('Activating rigid body');
        e.rigidbody.syncEntityToBody();
        e.rigidbody.activate();
    }
    e.rigidbody.applyForce(0, 9.8, 0);
    e.rigidbody.applyTorque(-7, 0, 0);
    //    e.rotate(30 * dt, 45 * dt, 20 * dt);

});
