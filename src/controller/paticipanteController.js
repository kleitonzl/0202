import express from 'express';
import conn from '../config/conn.js';

const router = express.Router();

// Rota para registrar um novo participante
router.post('/registrar', (req, res) => {
    const { nome, email } = req.body; // Extraindo dados do corpo da requisição
    const sql = 'INSERT INTO participantes (participante_id, nome, email) VALUES (?, ?, ?)';
    const participanteId = generateId(); // Implemente sua função para gerar um ID único

    conn.query(sql, [participanteId, nome, email], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Participante registrado com sucesso", id: participanteId });
    });
});

export default router;
