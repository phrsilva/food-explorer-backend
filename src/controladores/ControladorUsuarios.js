const {hash} = require("bcryptjs");
const knex = require("../baseDeDados/knex");
const ErroNoApp = require("../utils/ErroNoApp");

class ControladorUsuarios {
    async create(req, res) {
        try {
            const { nome, email, senha } = req.body;
    
            const verificaSeUsuarioExiste = await knex("usuarios").where({ email }).first();
    
            if (verificaSeUsuarioExiste) {
                throw new ErroNoApp("Email já cadastrado", 400);
            }
    
            function validarSenha(senha) {
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{8,}$/;
                return regex.test(senha);
            }
    
            if (!validarSenha(senha)) {
                throw new ErroNoApp("A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.", 400);
            }
    
            function validarEmail(email) {
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailRegex.test(email);
            }
    
            if (!validarEmail(email)) {
                throw new ErroNoApp("Email inválido", 400);
            }
    
            const senhaCriptografada = await hash(senha, 8);
    
            await knex("usuarios").insert({
                nome,
                email,
                senha: senhaCriptografada
            });
    
            return res.status(201).json({ message: "Usuário criado com sucesso!" });
    
        } catch (error) {
            if (error instanceof ErroNoApp) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            console.error("Erro interno no servidor:", error);
            return res.status(500).json({ message: "Erro interno no servidor" });
        }
    }
    
}


module.exports = new ControladorUsuarios();