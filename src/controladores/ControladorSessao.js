const knex = require("../baseDeDados/knex");
const ErroNoApp = require("../utils/ErroNoApp");
const { compare } = require("bcryptjs");
const configuracaoDeAutenticacao = require("../configs/aut")
const { sign } = require("jsonwebtoken");

class ControladorSessao {

    async create(req, res) {

        const { email, senha } = req.body;

        const usuario = await knex("usuarios").where({ email }).first();

        if (!usuario) {
            throw new ErroNoApp("Email ou senha incorretos", 401);
        }

        const verificarSenha = await compare(senha, usuario.senha);

        if (!verificarSenha) {
            throw new ErroNoApp("Email ou senha incorretos", 401);
        }

        const {secret, expiresIn} = configuracaoDeAutenticacao.jwt;

        const token = sign({}, secret, {
            subject: String(usuario.id),
            expiresIn
        });

        return res.json({
            usuario: {
                id: usuario.id,
                name: usuario.name,
                email: usuario.email
            },
            token
        });
        
    }
}

module.exports = ControladorSessao