CREATE DATABASE IF NOT EXISTS patas_que_transformam
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE patas_que_transformam;

CREATE TABLE IF NOT EXISTS resultados_questionario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pontuacao INT NOT NULL,
    total_perguntas INT NOT NULL,
    percentual_acertos DECIMAL(5,2) NOT NULL,
    data_resposta DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS respostas_questionario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    resultado_id INT NOT NULL,
    numero_pergunta INT NOT NULL,
    pergunta TEXT NOT NULL,
    resposta_escolhida TEXT NOT NULL,
    acertou BOOLEAN NOT NULL,

    CONSTRAINT fk_resultado
        FOREIGN KEY (resultado_id)
        REFERENCES resultados_questionario(id)
        ON DELETE CASCADE,

    UNIQUE (resultado_id, numero_pergunta)
) ENGINE=InnoDB;
