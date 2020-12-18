const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(request,response){
    // Buscar todos os devs num raio de 10km
    // Filtrar por tecnologias
    const {latitude, longitude, techs} = request.query;

    techsArray = parseStringAsArray(techs);

    let devs = [];
    for(tech of techsArray) {
      // Busca exata
      // const expression = new RegExp(`^${tech}$`, 'i');
      // Busca por um pedaço da string
      const expression = new RegExp(`${tech}`, 'i');
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
            $maxDistance: 10000
          }
        }
      });
      devs = [...devs, ...devsResult];
    }
    // Para tornar case-insensitive
    // salvar tudo minúsculo e pesquisar sempre minúsculo
    // Mas não vai ser possível usar o LIKE, então ver como fazer isso
    // Fazer um find por regex para cada tech e fazer um append ao array de devs?
    // const devs = await Dev.find({
    //   // Uso um objeto pois posso ter vários filtros para tecnologia
    //   techs:{
    //     // Pegar os devs que têm as techs EM techsArray
    //     // $in: Operador lógico do MongoDB
    //     $in:techsArray
    //   },
    //   location:{
    //     $near:{
    //       $geometry:{
    //         type: 'Point',
    //         coordinates: [longitude,latitude]
    //       },
    //       $maxDistance: 10000
    //     }
    //   }
    // });
    
    return response.json({devs});
  }
}