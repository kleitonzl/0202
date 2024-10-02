import conn from "../config/conn.js"; // Corrigido para minúsculas

const tableParticipantes = /*sql*/`
CREATE TABLE IF NOT EXISTS participantes (
    participante_id VARCHAR(60) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cargo VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    palestrante_id VARCHAR(60),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (palestrante_id) REFERENCES palestrante(palestrante_id) -- Certifique-se de que a tabela palestrante existe
);
`;

conn.query(tableParticipantes, (err) => {
    if (err) {
        console.error("Erro ao criar a tabela [participantes]:", err);
        return;
    }
    console.log("Tabela [participantes] criada com sucesso");
});
