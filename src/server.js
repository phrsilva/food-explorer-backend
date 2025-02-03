require("express-async-errors");

const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const express = require("express");

const ErroNoApp = require("./utils/ErroNoApp");
const rotas = require("./rotas");

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));

app.use(rotas);
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));



// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err);
  
    // Verifica se o erro é uma instância de ErroNoApp
    if (err instanceof ErroNoApp) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  
    // Erro genérico
    return res.status(500).json({ error: 'Erro interno no servidor!' });
  });

const PORT = 3000;

app.listen(PORT, () => console.log(`Servidor 'Food Explorer' em execução na porta ${PORT}`));