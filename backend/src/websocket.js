const socketio = require('socket.io');

const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

// Para ter acesso ao socket em outras funções
let io;
// Um array para salvar todas as conexões feitas
// Poderia ser uma tabela no BD para poder persistir os dados
const connections = [];

exports.setupWebSocket = (server) => {
  io = socketio(server);

  // Adicionou um Event Listener
  // Nesse caso o evento é a conexão
  io.on('connection', socket => {
    // socket.handshake.query: Para poder ver os parâmetros enviados pelo front-end
    // São as informações que serão comparadas com as infos do Dev novo para checar se mostra ele no mapa ou não
    const {latitude, longitude, techs} = socket.handshake.query;

    connections.push({
      // socket.id: possível identificar usuário e de qual dispositivo foi feita a conexão
      id: socket.id,
      // Os parâmetros latitude, longitude e techs vêm como strings
      coordinates:{
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs),
    });
  });
}

// Função que vai fazer os filtros das conexões
// Recebe as coordenadas e techs do NOVO Dev cadastrado
// Retorna todos os Devs que estão no raio de 10km e que estão pequisando techs que o Dev novo possui
exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    // Compara a distância do novo Dev cadastrado com as coordenadas das conexões
    return calculateDistance(coordinates, connection.coordinates) < 10
      // .some() : retorna True se pelo menos uma das condições for verdadeira
      && connection.techs.some(item => techs.includes(item))
      // Verifica se a tech pesquisada está entre as techs do novo Dev
  })
}

// to: para quem vai enviar a mensagem
// message: o tipo da mensagem
// data: os dados a serem enviados
exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message,data);
  })
}