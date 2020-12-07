const axios = require('axios');
const mongoose = require('mongoose');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

const {findConnections, sendMessage} = require('../websocket');

module.exports = {
  // Usar o async significa que a função pode demorar para responder
  async index(request,response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async show(request, response) {
    const { id } = request.params;
    const valid = mongoose.Types.ObjectId.isValid(id);
    if (!valid) {
      return response.status(400).json({ error: "Invalid ID" });
    }
    const dev = await Dev.findById(id);
    if (!dev) {
      return response.status(404).json({ error: "Dev not found" });
    }
    return response.json(dev);
  },

  async store(request,response) {
    const {github_username, techs, latitude, longitude} = request.body;

    let dev = await Dev.findOne({github_username});

    if (!dev){
      // Quando usa `` ao invés de '' significa que está usando um template strings
      // Significa que é possível usar variáveis na string
      // O await aguarda a resposta antes de continuar o código
      try {
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        // Desestruturação para pegar só os dados que quero
        // Se o nome não existir, por padrão ele vai ser o login (name não é obrigatório, mas o login é)
        const {name = login, avatar_url, bio} = apiResponse.data;
  
        
      
        // O map percorre o array e para cada entrada faz alguma coisa definida pela função
        const techsArray = parseStringAsArray(techs);
      
        const location = {
          type: 'Point',
          coordinates: [longitude,latitude]
        };
      
        dev = await Dev.create({
          // Não preciso escrever os dois nomes pois eles são iguais
          // github_username:github_username,
          // Se chama short syntax isso
          github_username,
          name,
          avatar_url,
          bio,
          techs:techsArray,
          location
        });
  
        // Filtrar as conexões que estão há no máximo 10km de distância
        // e que o novo Dev tenha pelo menos uma das tecnologias filtradas
  
        // Essa variável indica quais os Devs precisam exibir o novo Dev cadastrado no mapa
        const sendSocketMessageTo = findConnections(
          {latitude,longitude},
          techsArray
        );
        
        // O tipo de mensagem pode ser qualquer nome, neste caso foi escolhido 'new-dev'
        sendMessage(sendSocketMessageTo, 'new-dev', dev);
  
        return response.json(dev);
      } catch (err) {
        const status = err.response.status;
        if (status === 404) {
          return response.status(404).json({ error: "Dev not on Github" });      
        }
      }
    
    }
    return response.status(400).json({ error: "Dev already exists" });
  },

  // Atualizar as infos de um único Dev
  // Atualizar apenas: nome, avatar_url, bio, techs e location
  async update(request,response){
    const { id } = request.params;
    const valid = mongoose.Types.ObjectId.isValid(id);
    if (!valid) {
      return response.status(400).json({ error: "Invalid ID" });
    }

    const {techs} = request.body;

    const techsArray = parseStringAsArray(techs);

    const dev = await Dev.findByIdAndUpdate(id, {techs:techsArray});

    if (!dev) {
      return response.status(404).json({ error: "Dev not found" });
    }
    return response.json(dev);
  },

  // Deletar as infos de um único Dev de dentro do BD
  async destroy(request,response){
    const { id } = request.params;
    const valid = mongoose.Types.ObjectId.isValid(id);
    if (!valid) {
      return response.status(400).json({ error: "Invalid ID" });
    }

    const dev = await Dev.findByIdAndDelete(id);

    if (!dev) {
      return response.status(404).json({ error: "Dev not found" });
    }

    return response.status(203).json(dev);
  }
};