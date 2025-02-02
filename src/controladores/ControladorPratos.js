const knex = require("../baseDeDados/knex");
const ErroNoApp = require("../utils/ErroNoApp");
const bancoDeDados = require("../baseDeDados/index");

class ControladorPratos {
    async create(req, res) {

        const { nome, descricao, preco, categoria, ingredientes } = req.body;

        if (!nome || !descricao || !preco || !ingredientes || !categoria) {
            throw new ErroNoApp("Todos os campos devem ser preenchidos", 400);
        }

        // se a categoria não existir no enum, lançar erro
        if (!["entrada", "principal", "sobremesa"].includes(categoria)) {
            throw new ErroNoApp("Categoria inválida", 400);
        }

        const [prato_id] = await knex("pratos").insert({
            nome,
            descricao,
            preco,
            categoria
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

        const { nome, descricao, preco, ingredientes, categoria } = req.body;

        const banco = await bancoDeDados();
        const prato = await banco.get(`SELECT * FROM pratos WHERE id = ?`, [id]);

        if (!prato) {
            throw new ErroNoApp("Prato nao encontrado", 404);
        }

        if (!nome || !descricao || !preco || !ingredientes || ! categoria) {
            throw new ErroNoApp("Todos os campos devem ser preenchidos", 400);
        }

        await banco.run(`UPDATE pratos SET
            nome = ?,
            descricao = ?,
            preco = ?, 
            categoria = ?
            WHERE id = ?`, [nome, descricao, preco, categoria, id]);

        await banco.run(`DELETE FROM ingredientes WHERE prato_id = ?`, [id]);

        const inserirIngredientes = ingredientes.map(ingrediente => {
            return banco.run(`INSERT INTO ingredientes
                (nome, prato_id) 
                VALUES (?, ?)`, [ingrediente, id]);
        });

        await Promise.all(inserirIngredientes);

        return res.status(200).json({ message: "Prato atualizado com sucesso!" });
        
    }
   async delete(req, res) {

        const { id } = req.params;

        const prato = await knex("pratos").where({ id }).first();

        if (!prato) {
            throw new ErroNoApp("Prato nao encontrado", 404);
        }

        await knex("ingredientes").where({ prato_id: id }).delete();

        await knex("pratos").where({ id }).delete();

        return res.status(200).json({ message: "Prato deletado com sucesso!" });
        
    }
    
    async index(req, res) {
        
        const pratos = await knex("pratos").select("*");

        if (!pratos) {
            throw new ErroNoApp("Nenhum prato cadastrado", 404);
        }

        return res.json(pratos.map(prato => {
            return {
                id: prato.id,
                nome: prato.nome,
                descricao: prato.descricao,
                preco: prato.preco,
                categoria: prato.categoria,
                ingredientes: prato.ingredientes
            }
        }));
                
    }
    
    async show(req, res) {

        const { id } = req.params;

        const prato = await knex("pratos").where({ id }).first();

        if (!prato) {
            throw new ErroNoApp("Prato não encontrado", 404);        
        }

        return res.json({
            id: prato.id,
            nome: prato.nome,
            descricao: prato.descricao,
            preco: prato.preco,
            categoria: prato.categoria,
            ingredientes: prato.ingredientes
        });
                
    }
   
}

module.exports = new ControladorPratos();