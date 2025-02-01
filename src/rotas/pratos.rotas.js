const {Router} = require('express');
const controladorPratos = require('../controladores/ControladorPratos');

const rotasDePratos = Router();

rotasDePratos.post('/', controladorPratos.create);
rotasDePratos.put('/:id', controladorPratos.update);

module.exports = rotasDePratos;