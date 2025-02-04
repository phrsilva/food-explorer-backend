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

            const pratosPorIngrediente = await knex("ingredientes")
                .where("nome", "like", `%${termo}%`)
                .select("prato_id")
                .distinct();

            const idsPratosPorIngrediente = pratosPorIngrediente.map(item => item.prato_id);

            const pratosPorIngredientes = await knex("pratos")
                .whereIn("id", idsPratosPorIngrediente)
                .select("id", "nome");

            const todosPratos = [...pratosPorNome, ...pratosPorIngredientes];
            const pratosUnicos = Array.from(new Map(todosPratos.map(prato => [prato.id, prato])).values());




            res.json(pratosUnicos);
        } catch (error) {
            console.error("Erro na busca:", error);
            res.status(500).json({ message: "Erro ao buscar pratos" });
        }
    }
}

module.exports = new ControladorBusca();
