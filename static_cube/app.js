var socket = io.connect('http://localhost:8081');
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

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var render = function () {
    // requestAnimationFrame( render );
    renderer.render(scene, camera);
    if (prev_state === state)
        return;
    cube.position.set.apply(cube.position, state.elements.cube.position);
    cube.rotation.set.apply(cube.rotation, state.elements.cube.rotation);
};

render();