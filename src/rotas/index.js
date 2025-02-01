const { Router } = require("express");

const rotasDeUsuarios = require("./usuarios.rotas");
const rotasDePratos = require("./pratos.rotas");


const rotas = Router();

rotas.use("/usuarios", rotasDeUsuarios);
rotas.use("/pratos", rotasDePratos);


module.exports = rotas;

