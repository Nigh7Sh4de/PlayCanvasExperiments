var socket = io.connect('http://localhost:8081');
var stats = new Stats();
stats.showPanel(1);
document.body.appendChild(stats.dom);
var state = {}
var prev_state = state;
socket.on('NEW_STATE', function (data) {
    state = data;
    render()
});

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var cubes = [];
for (var i=0; i < 100; i++) {
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material )
    cubes.push( cube )
    scene.add( cube );
}

camera.position.z = 5;

var render = function () {
    // requestAnimationFrame( render );
    stats.begin();
    renderer.render(scene, camera);

    // cubes.forEach(cube => {
    //   cube.position.x += 0.05;
    //   if (cube.position.x > 5)
    //     cube.position.x = -5;
    //   cube.position.y += 0.05;
    //   if (cube.position.y > 1)
    //     cube.position.y = -1;
    //   cube.position.z += 0.05;
    //   if (cube.position.z > 1)
    //     cube.position.z = -1;
    // }) 
    
    if (prev_state.version !== state.version) {
        console.log('rendering')
        cubes.forEach(function(cube, i) {
            cube.position.set.apply(cube.position, state.elements.cubes[i].position);
            cube.rotation.set.apply(cube.rotation, state.elements.cubes[i].rotation);
        })
    }
    stats.end();
    // setTimeout(render);
};

render();