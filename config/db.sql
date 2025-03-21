create database ControlePortaria;
use ControlePortaria;
 
create table Moradores(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    bloco VARCHAR(255) NOT NULL,
    apartamento VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL, 
	status ENUM('residente', 'proprietario', 'visitante') NOT NULL,
    criado_em timestamp default current_timestamp NOT NULL
 
);
 
create table Veiculos(
	id INT PRIMARY KEY AUTO_INCREMENT,
	placa VARCHAR(7) NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    cor VARCHAR(255) NOT NULL,
	Moradores_id INT NOT NULL,  
    box VARCHAR(255) NOT NULL,
    criado_em timestamp default current_timestamp NOT NULL,
    FOREIGN KEY (Moradores_id) REFERENCES Moradores(id)

);
 
