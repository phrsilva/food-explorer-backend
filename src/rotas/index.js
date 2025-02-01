const { Router } = require("express");

const rotasDeUsuarios = require("./usuarios.rotas");

const rotas = Router();

rotas.use("/usuarios", rotasDeUsuarios);


module.exports = rotas;

