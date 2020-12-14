require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
// Para permitir acessar de outros endereços
const cors = require('cors');
// Para permitir ouvir e fazer requisições HTTP (O express usa por debaixo dos panos)
const http = require('http');

// Importar um código pessoal: dar o caminho relativo para o node não procurar pelo pacote
const routes = require('./routes');
const {setupWebSocket} = require('./websocket');

const app = express();
// Passa o servidor HTTP para fora do express
const server = http.Server(app);

// A função é disparada assim que a aplicação é inicializada
setupWebSocket(server);

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0-b01ut.mongodb.net/omnistack?retryWrites=true&w=majority`,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

// Libera o acesso externo para todo tipo de aplicação
app.use(cors());
// Para fazer o express entender JSON
// .use significa que vai valer globalmente para aplicação
app.use(express.json());
app.use(routes);

// Rodar pelo express
// app.listen(3333);
// Rodar pelo servidor HTTP extraído
server.listen(3333);