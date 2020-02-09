const mongoose = require('mongoose');

// PointSchema vai respresentar um ponto no mapa
const PointSchema = new mongoose.Schema({
  // Esse primeiro type é como se fosse uma coluna
  type:{
    type: String,
    // Significa que ela precisa ser Point
    enum: ['Point'],
    required: true
  },
  // As coordinates são a latitude e longitude
  // Importante: no MongoDB, a ordem que é utilizada é longitude, latitude
  coordinates: {
    type: [Number],
    required: true
  }
});

module.exports = PointSchema;