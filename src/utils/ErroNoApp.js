class ErroNoApp {
    mensagemDeErro;
    codigoDoErro;
  
    constructor(mensagemDeErro, codigoDoErro = 400) {
      this.mensagemDeErro = mensagemDeErro;
      this.codigoDoErro = codigoDoErro;
    }
  }
  
  module.exports = ErroNoApp;