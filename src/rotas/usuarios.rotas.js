const {Router} = require('express');

const controladorUsuarios = require('../controladores/ControladorUsuarios');

const rotasDeUsuario = Router();

rotasDeUsuario.post('/', controladorUsuarios.create);

module.exports = rotasDeUsuario