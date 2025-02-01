const knex = require("../baseDeDados/knex");
const ErroNoApp = require("../utils/ErroNoApp");

class ControladorPratos {
    async create(req, res) {

        const { nome, descricao, preco, ingredientes } = req.body;

        if (!nome || !descricao || !preco || !ingredientes ) {
            throw new ErroNoApp("Todos os campos devem ser preenchidos", 400);
        }

        const [prato_id] = await knex("pratos").insert({
            nome,
            descricao,
            preco
        });

        const inserirIngredientes = ingredientes.map(ingrediente => {
            return knex("ingredientes").insert({
                nome: ingrediente,
                prato_id
            });
        });

        await Promise.all(inserirIngredientes);



        return res.status(201).json({ message: "Prato criado com sucesso!" });



    }

    async index(req, res) {

    }

    async show(req, res) {

    }

    async update(req, res) {
        

    }

    async delete(req, res) {

    }
}

module.exports = new ControladorPratos();