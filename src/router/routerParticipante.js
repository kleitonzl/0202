import { Router } from "express";
import conn from '../config/conn.js'; // Importa a conexão com o banco de dados

const router = Router();

// Função para gerar um ID único
const generateId = () => {
    return 'ID-' + Math.random().toString(36).substr(2, 9); // Exemplo de geração de ID único
};

// Rota para criar um novo participante
router.post('/', (req, res) => {
    const { nome, cargo, telefone, palestrante_id } = req.body; // Extraindo dados do corpo da requisição

    // Validação básica
    if (!nome || !cargo || !telefone || !palestrante_id) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // Comando SQL para inserir um novo participante
    const sql = `INSERT INTO participantes (participante_id, nome, cargo, telefone, palestrante_id) VALUES (?, ?, ?, ?, ?)`;
    const participanteId = generateId(); // Gerando um ID único

    conn.query(sql, [participanteId, nome, cargo, telefone, palestrante_id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao criar participante." });
        }
        res.status(201).json({ message: "Participante criado com sucesso", id: participanteId });
    });
});

// Rota para listar todos os participantes
router.get('/', (req, res) => {
    const sql = `SELECT * FROM participantes`;

    conn.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao buscar participantes." });
        }
        res.status(200).json(results);
    });
});

export default router;
