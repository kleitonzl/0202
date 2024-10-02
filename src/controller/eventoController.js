import express from 'express';
import conn from '../config/conn.js';

const router = express.Router();

// Validação simples de dados
const validarDadosEvento = (titulo, data) => {
    if (!titulo || !data) {
        return { valido: false, mensagem: 'Título e data são obrigatórios' };
    }
    return { valido: true };
};

// Rota para criar um novo evento
router.post('/criar', (req, res) => {
    const { titulo, data, palestrantesId } = req.body; // Extraindo dados do corpo da requisição

    const { valido, mensagem } = validarDadosEvento(titulo, data);
    if (!valido) {
        return res.status(400).json({ error: mensagem });
    }

    const sql = 'INSERT INTO eventos (titulo, data) VALUES (?, ?)';

    conn.query(sql, [titulo, data], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao criar evento: ' + err.message });
        }

        const eventoId = result.insertId; // Obtém o ID do evento criado

        // Associar palestrantes ao evento
        if (palestrantesId && palestrantesId.length > 0) {
            const insertPalestrantes = palestrantesId.map(id => [eventoId, id]);
            const sqlPalestrantes = 'INSERT INTO eventos_palestrantes (evento_id, palestrante_id) VALUES ?';
            conn.query(sqlPalestrantes, [insertPalestrantes], (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Erro ao associar palestrantes: ' + err.message });
                }
                res.status(201).json({ message: 'Evento criado com sucesso', id: eventoId });
            });
        } else {
            res.status(201).json({ message: 'Evento criado com sucesso', id: eventoId });
        }
    });
});

// Rota para listar todos os eventos com detalhes dos palestrantes
router.get('/agenda', (req, res) => {
    const sql = `
        SELECT e.*, GROUP_CONCAT(p.nome) AS palestrantes
        FROM eventos e
        LEFT JOIN eventos_palestrantes ep ON e.id = ep.evento_id
        LEFT JOIN palestrante p ON ep.palestrante_id = p.palestrante_id
        GROUP BY e.id;
    `;

    conn.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao listar eventos: ' + err.message });
        }
        res.status(200).json(results);
    });
});

export default router;
