const {Router} = require('express');
const controladorPratos = require('../controladores/ControladorPratos');

const rotasDePratos = Router();

rotasDePratos.post('/', controladorPratos.create);
rotasDePratos.put('/:id', controladorPratos.update);
rotasDePratos.delete('/:id', controladorPratos.delete);
rotasDePratos.get('/', controladorPratos.index);
rotasDePratos.get('/:id', controladorPratos.show);

module.exports = rotasDePratos;