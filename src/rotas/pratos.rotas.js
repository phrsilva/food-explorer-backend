const {Router} = require('express');
const controladorPratos = require('../controladores/ControladorPratos');

const rotasDePratos = Router();

rotasDePratos.post('/', controladorPratos.create);

module.exports = rotasDePratos;