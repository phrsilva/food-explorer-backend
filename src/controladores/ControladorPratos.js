const knex = require("../baseDeDados/knex");
const ErroNoApp = require("../utils/ErroNoApp");
const bancoDeDados = require("../baseDeDados/index");

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

    async update(req, res) {

        const { id } = req.params;

        const { nome, descricao, preco, ingredientes } = req.body;

        const banco = await bancoDeDados();
        const prato = await banco.get(`SELECT * FROM pratos WHERE id = ${id}`);

        if (!prato) {
            throw new ErroNoApp("Prato nao encontrado", 404);
        }

        if (!nome || !descricao || !preco || !ingredientes) {
            throw new ErroNoApp("Todos os campos devem ser preenchidos", 400);
        }

        await banco.run(`UPDATE pratos SET
            nome = ?,
            descricao = ?,
            preco = ?
            WHERE id = ?`, [nome, descricao, preco, id]);

        await banco.run(`DELETE FROM ingredientes WHERE prato_id = ?`, [id]);

        const inserirIngredientes = ingredientes.map(ingrediente => {
            return banco.run(`INSERT INTO ingredientes
                (nome, prato_id) 
                VALUES (?, ?)`, [ingrediente, id]);
        });

        await Promise.all(inserirIngredientes);

        return res.status(200).json({ message: "Prato atualizado com sucesso!" });

    }

    async index(req, res) {

    }

    async show(req, res) {

    }


    async delete(req, res) {

        

    }
}

module.exports = new ControladorPratos();