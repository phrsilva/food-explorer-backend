const {hash} = require("bcryptjs");
const knex = require("../baseDeDados/knex");
const ErroNoApp = require("../utils/ErroNoApp");

class ControladorUsuarios {
    async create(req, res) {
        const {nome, email, senha} = req.body;

        // verificar existencia do usuário

        const verificaSeUsuarioExiste = await knex("usuarios").where({email}).first();

        if (verificaSeUsuarioExiste) {
            throw new ErroNoApp("Email ja cadastrado", 400);
        }

        // verifica se a senha tem mais de 8 digitos, maiúsculas, minúsculas e caracteres especiais

        function validarSenha(senha) {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{8,}$/;
            return regex.test(senha);
        }

        if (!validarSenha(senha)) {
            throw new ErroNoApp("A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial", 400);
        }

        // verificar se o email é válido

        function validarEmail(email) {
            // expressão regular
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}/
            return emailRegex.test(email);
            
        }

        if (!validarEmail(email)) {
            throw new ErroNoApp('Email inválido', 400);
        }

        // criptografar a senha

        const senhaCriptografada = await hash(senha, 8);

        // salvar o usuário no banco de dados

        await knex("usuarios").insert({
            nome,
            email,
            senha: senhaCriptografada
        });

        return res.status(201).json({"201": "Usuário criado com sucesso!!"});

    }
}


module.exports = new ControladorUsuarios();