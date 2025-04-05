create database ControlePortaria;
use ControlePortaria;
 
create table Moradores(
	idMoradores INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL, 
	status ENUM('residente', 'proprietario', 'visitante') NOT NULL,
    criado_em timestamp default current_timestamp NOT NULL
 
);

create table Veiculos(
	idVeiculos INT PRIMARY KEY AUTO_INCREMENT,
	placa VARCHAR(7) NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    cor VARCHAR(255) NOT NULL,
    Box VARCHAR(255) NOT NULL,
	Moradores_id INT NOT NULL,  
    criado_em timestamp default current_timestamp NOT NULL,
    FOREIGN KEY (Moradores_id) REFERENCES Moradores(idMoradores)

);
 
CREATE TABLE Apartamento (
    idApartamento INT PRIMARY KEY AUTO_INCREMENT,
    numeroApartamento int not null,
    bloco VARCHAR(1) NOT NULL,
    idMorador int not null,
    FOREIGN KEY (idMorador) REFERENCES Moradores(idMoradores)
)