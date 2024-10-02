import conn from "../config/conn.js";

const tablePalestrante = /*sql*/`
CREATE TABLE IF NOT EXISTS palestrante (
    palestrante_id VARCHAR(60) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cargo VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

conn.query(tablePalestrante, (err) => {
    if (err) {
        console.error("Erro ao criar tabela [palestrante]:", err);
        return;
    }
    console.log("Tabela [palestrante] criada com sucesso");
});
