require("express-async-errors");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const routes = require("./routes");

const ErroNoApp = require("./utils/ErroNoApp");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));

app.use(routes);

app.use((err, request, response, next) => {
    if (err instanceof ErroNoApp) {
        return response.status(err.statusCode).json({
            status: "error",
            mensagemDeErro: err.mensagemDeErro,
        });
    }
    
    console.error(err);
    
    return response.status(500).json({
        status: "error",
        mensagemDeErro: "Internal server error",
    });
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Servidor 'Food Explorer' em execução na porta ${PORT}`));