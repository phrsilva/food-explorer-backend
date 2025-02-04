const { Router } = require("express");
const garantirAutenticacao = require("../middlewares/garantirAutenticacao");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const controladorPratos = require("../controladores/ControladorPratos");
const ControladorFotoDoPrato = require("../controladores/ControladorFotoDoPrato");
const ControladorBusca = require("../controladores/ControladorBusca"); // ✅ Importando o Controlador de Busca

const rotasDePratos = Router();
const upload = multer(uploadConfig);

const controladorFotoDoPrato = new ControladorFotoDoPrato();

rotasDePratos.use(garantirAutenticacao);

// ✅ Adicionando a rota de busca antes de /:id para evitar conflitos
rotasDePratos.get("/busca", ControladorBusca.buscar); 

rotasDePratos.post("/", controladorPratos.create);
rotasDePratos.put("/:id", controladorPratos.update);
rotasDePratos.delete("/:id", controladorPratos.delete);
rotasDePratos.get("/", controladorPratos.index);
rotasDePratos.get("/:id", controladorPratos.show);

rotasDePratos.patch("/:id", upload.single("foto"), controladorFotoDoPrato.update);

module.exports = rotasDePratos;
