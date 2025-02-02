const config = require("../../../knexfile");
const knex = require("knex");

const conexao = knex(config.development);

// Executa as migrações ao iniciar o servidor
conexao.migrate.latest()
    .then(() => {
        console.log("📦 Banco de dados pronto! Migrações aplicadas.");
    })
    .catch(error => {
        console.error("Erro ao executar migrações:", error);
    });


module.exports = conexao;

