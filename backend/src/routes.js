const {Router} = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.get('/devs/:id', DevController.show);
routes.post('/devs', DevController.store);
routes.delete('/devs/:id', DevController.destroy);

routes.get('/search', SearchController.index);

// Torna disponível para usar em outros códigos
module.exports = routes;