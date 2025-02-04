const { Router } = require("express");

const rotasDeUsuarios = require("./usuarios.rotas");
const rotasDePratos = require("./pratos.rotas");
const rotasDeSessao = require("./sessao.rotas");


const rotas = Router();

rotas.use("/usuarios", rotasDeUsuarios);
rotas.use("/pratos", rotasDePratos);
rotas.use("/sessao", rotasDeSessao);
rotas.use("/busca", rotasDePratos);


module.exports = rotas;

