var socketio = require('socket.io');
var io;

exports.listen = function(streznik) {
  io = socketio.listen(streznik);
  io.sockets.on('connection', function (socket) {
      obdelajFbAppi(socket);
      
  });
};

function obdelajFbAppi(socket){
  socket.emit('sporocilo', "no");
}
