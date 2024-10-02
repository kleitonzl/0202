import { Router } from "express";
import conn from '../config/conn.js'; // Importa a conexão com o banco de dados

const router = Router();

// Rota para criar um novo palestrante
router.post('/', (req, res) => {
    const { nome, expertise } = req.body; // Extraindo dados do corpo da requisição

    // Comando SQL para inserir um novo palestrante
    const sql = `INSERT INTO palestrantes (palestrante_id, nome, expertise) VALUES (?, ?, ?)`;
    const palestranteId = generateId(); // Implemente sua função para gerar um ID único

    conn.query(sql, [palestranteId, nome, expertise], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Palestrante criado com sucesso", id: palestranteId });
    });
});

// Rota para listar todos os palestrantes
router.get('/', (req, res) => {
    const sql = `SELECT * FROM palestrantes`;

    conn.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Exportar o router como padrão
export default router;
