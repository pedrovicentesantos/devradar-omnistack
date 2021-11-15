const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(request,response){
    // Buscar todos os devs num raio de 10km
    // Filtrar por tecnologias
    const {latitude, longitude, techs, exactMatch, radius} = request.query;

    const techsArray = parseStringAsArray(techs);
    const radiusInMeters = radius * 1000;

    let devs = [];
    for(const tech of techsArray) {
      let expression = "";
      
      if (exactMatch === 'true') {
        expression = new RegExp(`^${tech}$`, 'i');
      } else if (exactMatch === 'false') {
        expression = new RegExp(`${tech}`, 'i');
      }

      const devsResult = await Dev.find({
        techs: {
          $regex: expression
        },
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude]
            },
            $maxDistance: radiusInMeters
          }
        }
      });
      devs = [...devs, ...devsResult];
    }
    
    return response.json({devs});
  }
}