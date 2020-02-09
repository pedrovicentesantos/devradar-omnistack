import socketio from 'socket.io-client';  

const socket = socketio('http://192.168.0.13:3333', {
  autoConnect: false,
});

function subscribeToNewDevs(subscribeFunction) {
  // 'new-dev' é o evento enviado pelo back-end
  socket.on('new-dev', subscribeFunction);
}

function connect(latitude, longitude, techs) {
  // Para enviar os dados para o back-end
  socket.io.opts.query = {
    latitude,
    longitude,
    techs,
  };
  socket.connect();

  // Recebe a mensagem enviada pelo back-end
  // socket.on('message', text => {
  //   console.log(text);
  // })
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export {
  connect,
  disconnect,
  subscribeToNewDevs,
};