import express from 'express';
import conn from './config/conn.js';
import "dotenv/config";

import routerPalestrante from './router/routerPalestrante.js';
import routerParticipante from './router/routerParticipante.js';

import "./models/palestranteModel.js";
import "./models/participanteModel.js";

const PORT = process.env.PORT || 3333;
const app = express();

app.use(express.json());

// Middleware de validação simples
const validarPalestrante = (req, res, next) => {
    const { nome, cargo, telefone } = req.body;
    if (!nome || !cargo || !telefone) {
        return res.status(400).json({ error: "Nome, cargo e telefone são obrigatórios." });
    }
    next();
};

// Utilizar as rotas
app.use('/palestrante', routerPalestrante);
app.use('/participantes', routerParticipante);

// Rota para tratamento de rotas não encontradas
app.get("*", (request, response) => {
    response.status(404).json({ message: "Rota não encontrada, ajuda Jesus!" });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Conexão com o MySQL
conn.getConnection((err) => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
        process.exit(1); // Saia do processo se a conexão falhar
    }
    console.log('Conectado ao MySQL com sucesso!');
});
