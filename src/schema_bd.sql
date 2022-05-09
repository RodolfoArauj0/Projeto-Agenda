
CREATE DATABASE agenda

CREATE TABLE contatos(
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL, 
    sobrenome TEXT NOT NULL,
    cpf CHAR(14) UNIQUE, 
    email TEXT UNIQUE,
    telefone TEXT NOT NULL UNIQUE
);
