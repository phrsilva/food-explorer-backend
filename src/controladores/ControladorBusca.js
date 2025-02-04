const knex = require("../baseDeDados/knex");

class ControladorBusca {
    async buscar(req, res) {
        const { termo } = req.query;
        if (!termo) {
            return res.json([]);
        }

        try {
            const pratosPorNome = await knex("pratos")
                .where("nome", "like", `%${termo}%`)
                .select("id", "nome");

            res.json(pratosPorNome);
        } catch (error) {
            console.error("Erro na busca:", error);
            res.status(500).json({ message: "Erro ao buscar pratos" });
        }
    }
}

module.exports = new ControladorBusca();
