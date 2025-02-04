const knex = require("../baseDeDados/knex");
const ErroNoApp = require("../utils/ErroNoApp");
const DiskStorage = require("../providers/DiskStorage");


class ControladorFotoDoPrato {
    async update(req, res) {
        const { id } = req.params;
        const nomeDaFoto = req.file.filename;
        console.log("Foto enviada:", nomeDaFoto);
        
        const diskStorage = new DiskStorage();
    
        const prato = await knex("pratos").where({ id }).first();
    
        if (!prato) {
            throw new ErroNoApp("Prato não encontrado", 404);
        }
    
        
    
        await knex("pratos").where({ id }).update({
            foto: nomeDaFoto,
        });
    
        return res.json({ message: "Foto do prato atualizada com sucesso!" });
    }
    
}

module.exports = ControladorFotoDoPrato