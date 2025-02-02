const path = require('path');
const multer = require('multer');

const uploadConfig = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, "..", "uploads"), // Pasta onde as fotos serão salvas
        filename: (req, file, callback) => {
            const ext = path.extname(file.originalname); // Extensão do arquivo
            const name = path.basename(file.originalname, ext); // Nome do arquivo sem extensão
            callback(null, `${name}-${Date.now()}${ext}`); // Nome único para o arquivo
        }
    })
};

module.exports = uploadConfig;