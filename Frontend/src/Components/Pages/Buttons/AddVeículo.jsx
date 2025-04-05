import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { cadastrarVeiculo } from "../../../Services/Veiculos.Api";
import { listarPerfil } from "../../../Services/Perfis.Api";

const Botão = styled.button`
  position: absolute; /* Para posicionar dentro do Background */
  top: 10px; /* Distância do topo */
  right: 10px; /* Distância da direita */
  margin-top: 3vh;
  margin-right: 3vw;
  width: 40px;
  height: 40px;
  background-color: #01c99a;
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #015b2b;
  }
`;

const ModalFundo = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo escurecido */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalConteúdo = styled.div`
  background-color: #dcdcdc;
  width: 60vw;
  height: 70vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 40px 70px;
  position: relative;
`;

const FecharBotão = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const TítuloModal = styled.h2`
  font-weight: bold;
  font-family: Arial, sans-serif;
  text-align: center;
  vertical-align: top;
  margin-bottom: 30px;
`;

const Label = styled.label`
  display: block;
  margin: 15px 0 5px;
  font-weight: bold;
  font-family: Arial, sans-serif;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  background-color: #c7c5c5;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  display: block;
  width: 250px;
  height: 40px;
  margin-top: 5vh;
  margin-left: 18vw;
  padding: 10px;
  background-color: #00cc66;
  color: white;
  font-weight: bold;
  font-family: Arial, sans-serif;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #00994d;
  }
`;

const ToListLink = styled.p`
  margin-top: 2vh;
  margin-bottom: 0;
  margin-left: 21.5vw;
  font-size: 14px;
  color: white;
  font-weight: bold;
  font-weight: bold;
  font-family: Arial, sans-serif;
`;

const StyledLink = styled(Link)`
  color: black;
  font-weight: bold;
  text-decoration: none;
  font-weight: bold;
  margin-bottom: 0;
  font-weight: bold;
  font-family: Arial, sans-serif;

  &:hover {
    color: green;
  }
`;

const Message = styled.p`
  color: green;
  margin-top: 2vh;
  margin-left: 19vw;
  font-weight: bold;
  font-family: Arial, sans-serif;
`;

export default function AddVeiculoButton() {
  const [modalAberto, setModalAberto] = useState(false);
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [cor, setCor] = useState("");
  const [Box, setBox] = useState("");
  const [Moradores, setMoradores] = useState([]);
  const [Moradores_id, setMoradores_id] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function buscarMoradores() {
      try {
        const res = await listarPerfil();
        setMoradores(res.data);
      } catch (err) {
        console.error("Erro ao buscar moradores", err);
      }
    }

    buscarMoradores();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault(); //evita que a página recarregue

    if (!placa || !modelo || !cor || !Box || !Moradores_id) {
      setMessage("Preencha todos os campos!");
      return;
    }

    try {
      const response = await cadastrarVeiculo({
        placa,
        modelo,
        cor,
        Box,
        Moradores_id: Number(Moradores_id),
      });

      if (response.error) {
        setMessage(`Erro: ${response.error}`);
      } else {
        setMessage("Veículo cadastrado com sucesso!");
        setPlaca("");
        setModelo("");
        setCor("");
        setBox("");
        setMoradores_id("");
      }
    } catch (error) {
      console.error("Erro ao cadastrar veículo:", error);
      setMessage("Erro ao cadastrar veículo.");
    }
  };

  return (
    <>
      <Botão onClick={() => setModalAberto(true)}>+</Botão>

      {modalAberto && (
        <ModalFundo>
          <ModalConteúdo>
            <FecharBotão
              onClick={() => {
                setModalAberto(false);
                setMessage("");
              }}
            >
              ✖
            </FecharBotão>
            <TítuloModal>Cadastro de Veículo</TítuloModal>

            <form onSubmit={handleSubmit}>
              <Label>Placa:</Label>
              <Input
                type="text"
                placeholder="Digite a placa do veículo"
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
              />

              <Label>Modelo:</Label>
              <Input
                type="text"
                placeholder="Digite o modelo do veículo"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
              />

              <Label>Cor:</Label>
              <Input
                type="text"
                placeholder="Digite a cor do veículo"
                value={cor}
                onChange={(e) => setCor(e.target.value)}
              />

              <Label>Vaga:</Label>
              <Input
                type="text"
                placeholder="Digite a vaga do veículo"
                value={Box}
                onChange={(e) => setBox(e.target.value)}
              />

              <Label>Dono:</Label>
              <select
                value={Moradores_id}
                onChange={(e) => setMoradores_id(e.target.value)}
              >
                <option value="">Selecione o nome do dono</option>
                {Moradores.map((morador) => (
                  <option key={morador.idMoradores} value={morador.idMoradores}>
                    {morador.nome}
                  </option>
                ))}
              </select>
              <SubmitButton type="submit">Pronto!</SubmitButton>
            </form>

            <ToListLink>
              <StyledLink to="/Veículos">Ver lista de veículos</StyledLink>
            </ToListLink>
            {message && <Message>{message}</Message>}
          </ModalConteúdo>
        </ModalFundo>
      )}
    </>
  );
}
