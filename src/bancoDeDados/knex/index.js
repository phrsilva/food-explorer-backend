const config = require("../../../knexfile");
const knex = require("knex");

const conexao = knex(config.development);

module.exports = conexao;