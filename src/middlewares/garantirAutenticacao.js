const { verify } = require("jsonwebtoken");
const ErroNoApp = require("../utils/ErroNoApp");
const configuracaoDeAutenticacao = require("../configs/aut");

function garantirAutenticacao(req, res, next) {
    const cabecalhoAutenticacao = req.headers.authorization;
    console.log('teste1 ----->',cabecalhoAutenticacao); // Verifique o cabecalho de autenticacao

    
    if (!cabecalhoAutenticacao) {
        throw new ErroNoApp("Token não informado", 401);
    }

    console.log('teste2 ----->',cabecalhoAutenticacao); // Verifique o cabecalho de autenticacao


    const [, token] = cabecalhoAutenticacao.split(" ");
    console.log('teste3 ======',token); // Verifique o cabecalho de autenticacao

    try {
        const { sub: usuario_id } = verify(token, configuracaoDeAutenticacao.jwt.secret);
        req.usuario = { id: Number(usuario_id) };
        return next();
    } catch (error) {
        throw new ErroNoApp("Token inválido", 401);
    }
}


module.exports = garantirAutenticacao;