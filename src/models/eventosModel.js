import conn from '../config/conn.js';

const tableEventosParticipantes = /*sql*/ `
CREATE TABLE IF NOT EXISTS eventos_participantes (
    evento_id INT,
    participante_id VARCHAR(60),
    FOREIGN KEY (evento_id) REFERENCES eventos(id),
    FOREIGN KEY (participante_id) REFERENCES participantes(participante_id)
);
`;

conn.query(tableEventosParticipantes, (err) => {
    if (err) {
        console.error("Erro ao criar tabela [eventos_participantes]:", err);
        return;
    }
    console.log("Tabela [eventos_participantes] criada com sucesso");
});

// Criação da tabela para associar eventos e palestrantes
const tableEventosPalestrantes = /*sql*/ `
CREATE TABLE IF NOT EXISTS eventos_palestrantes (
    evento_id INT,
    palestrante_id VARCHAR(60),
    FOREIGN KEY (evento_id) REFERENCES eventos(id),
    FOREIGN KEY (palestrante_id) REFERENCES palestrante(palestrante_id)
);
`;

conn.query(tableEventosPalestrantes, (err) => {
    if (err) {
        console.error("Erro ao criar tabela [eventos_palestrantes]:", err);
        return;
    }
    console.log("Tabela [eventos_palestrantes] criada com sucesso");
});
