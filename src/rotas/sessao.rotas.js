const {Router} = require('express');
const ControladorSessao = require('../controladores/ControladorSessao');


const rotasDeSessao = Router();
const controladorSessao = new ControladorSessao();

rotasDeSessao.post('/', controladorSessao.create);

module.exports = rotasDeSessao