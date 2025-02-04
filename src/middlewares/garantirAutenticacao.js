const { verify } = require("jsonwebtoken");
const ErroNoApp = require("../utils/ErroNoApp");
const configuracaoDeAutenticacao = require("../configs/aut");

function garantirAutenticacao(req, res, next) {
    const cabecalhoAutenticacao = req.headers.authorization;

    
    if (!cabecalhoAutenticacao) {
        throw new ErroNoApp("Token não informado", 401);
    }



    const [, token] = cabecalhoAutenticacao.split(" ");

    try {
        const { sub: usuario_id } = verify(token, configuracaoDeAutenticacao.jwt.secret);
        req.usuario = { id: Number(usuario_id) };
        return next();
    } catch (error) {
        throw new ErroNoApp("Token inválido", 401);
    }
}


module.exports = garantirAutenticacao;