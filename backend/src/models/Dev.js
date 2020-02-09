const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema')

const DevSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  // Cria um array de strings
  techs: [String],
  location: {
    type: PointSchema,
    // Para facilitar a busca do ponto, como se fosse o eixo x e y
    index: '2dsphere'
  }
});

// Primeiro parametro é o nome no BD e o segundo é o Schema
module.exports = mongoose.model('Dev', DevSchema)