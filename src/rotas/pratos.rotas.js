const {Router} = require('express');
const garantirAutenticacao = require('../middlewares/garantirAutenticacao');
const multer = require('multer');
const uploadConfig = require('../configs/upload');
const ErroNoApp = require('../utils/ErroNoApp');


const controladorPratos = require('../controladores/ControladorPratos');
const ControladorFotoDoPrato = require('../controladores/ControladorFotoDoPrato');
const rotasDePratos = Router();
const upload = multer(uploadConfig);

const controladorFotoDoPrato = new ControladorFotoDoPrato();
rotasDePratos.use(garantirAutenticacao);

rotasDePratos.post('/', controladorPratos.create);
rotasDePratos.put('/:id', controladorPratos.update);
rotasDePratos.delete('/:id', controladorPratos.delete);
rotasDePratos.get('/', controladorPratos.index);
rotasDePratos.get('/:id', controladorPratos.show);

rotasDePratos.patch('/:id', upload.single('foto'), controladorFotoDoPrato.update);


module.exports = rotasDePratos;