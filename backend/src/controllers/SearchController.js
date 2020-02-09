const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(request,response){
    // Buscar todos os devs num raio de 10km
    // Filtrar por tecnologias
    const {latitude, longitude, techs} = request.query;

    techsArray = parseStringAsArray(techs);
    
    const devs = await Dev.find({
      // Uso um objeto pois posso ter vários filtros para tecnologia
      techs:{
        // Pegar os devs que têm as techs EM techsArray
        // $in: Operador lógico do MongoDB
        $in:techsArray
      },
      location:{
        $near:{
          $geometry:{
            type: 'Point',
            coordinates: [longitude,latitude]
          },
          $maxDistance: 10000
        }
      }
    });
    
    return response.json({devs});
  }
}