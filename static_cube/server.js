var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Immutable = require('Immutable');

server.listen(8081);

var Element = Immutable.Record({
  position: Immutable.List.of(Number),
  rotation: Immutable.List.of(Number)
})

var State = Immutable.Record({
  elements: Immutable.List()
})

// var state = State() //init
// var element = Element({rotation: [0, 0, 0], position: [0, 0, 0]})
// state = state.set('elements', state.elements.push(element))

var state = {
  elements: {
    cube: {
      position: [0, 0, 0],
      rotation: [0, 0, 0]
    }
  }
}

app.use(express.static(__dirname))

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  var rotate = () => {
    state.elements.cube.position[0] += 0.05;
    if (state.elements.cube.position[0] > 5)
      state.elements.cube.position[0] = -5;
    state.elements.cube.position[1] += 0.05;
    if (state.elements.cube.position[1] > 1)
      state.elements.cube.position[1] = -1;
    state.elements.cube.position[2] += 0.05;
    if (state.elements.cube.position[2] > 1)
      state.elements.cube.position[2] = -1;
    socket.emit('NEW_STATE', state)
  }
  setInterval(rotate, 15);
});