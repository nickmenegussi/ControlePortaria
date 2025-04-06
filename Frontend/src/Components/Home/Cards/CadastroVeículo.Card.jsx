import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { cadastrarVeiculo } from "../../../Services/Veiculos.Api";
import { listarPerfil } from "../../../Services/Perfis.Api";

const Background = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 28vw;
  height: 35vh;
  margin-top: 25vh;
  margin-left: 4vw;
  border-radius: 10px;

  @media (max-width: 1000px) {
    width: 26vw;
    height: 33vh;
  }

  @media (max-width: 665px) {
    width: 24vw;
    height: 31vh;
  }

  @media (max-width: 590px) {
    margin-left: 6vw;
  }

  @media (max-width: 410px) {
    width: 22vw;
    height: 29vh;
    margin-left: 5vw;
  }
`;

const Título = styled.h2`
  font-weight: bold;
  font-family: Arial, sans-serif;
  text-align: center;
  margin-bottom: 80px;

  @media (max-width: 1000px) {
    font-size: 20px;
  }

  @media (max-width: 665px) {
    font-size: 14px;
  }

  @media (max-width: 487px) {
    font-size: 10px;
  }

  @media (max-width: 373px) {
    font-size: 9px;
  }
`;

const Botão = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: Arial, sans-serif;
  width: 200px;
  height: 60px;
  padding: 10px;
  background-color: #00cc66;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #00994d;
  }

  @media (max-width: 1000px) {
    font-size: 20px;
    width: 180px;
    height: 55px;
  }

  @media (max-width: 755px) {
    font-size: 14px;
    width: 140px;
    height: 50px;
  }

  @media (max-width: 615px) {
    font-size: 10px;
    width: 110px;
    height: 30px;
  }

  @media (max-width: 487px) {
    font-size: 8px;
    width: 80px;
    height: 10px;
  }

  @media (max-width: 373px) {
    font-size: 6px;
    width: 60px;
    height: 10px;
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
  width: 75vw;
  height: 85vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 40px 70px;
  position: relative;

  @media (max-width: 1800px) {
    width: 70vw;
    height: 80vh;
  }
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

  @media (max-width: 1225px) {
    font-size: 22px;
  }

  @media (max-width: 980px) {
    font-size: 20px;
  }

  @media (max-width: 810px) {
    font-size: 18px;
  }

  @media (max-width: 740px) {
    font-size: 17px;
  }

  @media (max-width: 490px) {
    font-size: 12px;
  }
`;

const Label = styled.label`
  display: block;
  margin: 15px 0 5px;
  font-weight: bold;
  font-family: Arial, sans-serif;
  text-align: left;

  @media (max-width: 1225px) {
    font-size: 15px;
  }

  @media (max-width: 980px) {
    font-size: 14px;
  }

  @media (max-width: 810px) {
    font-size: 13.5px;
  }

  @media (max-width: 740px) {
    font-size: 13px;
  }

  @media (max-width: 490px) {
    font-size: 8px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  background-color: #c7c5c5;

  @media (max-width: 1225px) {
    font-size: 15px;
  }

  @media (max-width: 980px) {
    font-size: 14px;
  }

  @media (max-width: 810px) {
    font-size: 13.5px;
  }

  @media (max-width: 740px) {
    font-size: 13px;
  }

  @media (max-width: 490px) {
    font-size: 7px;
  }
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  display: block;
  width: 250px;
  height: 40px;
  margin-top: 5vh;
  margin-left: 25vw;
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

  @media (max-width: 1800px) {
    margin-top: 2vh;
    margin-left: 23vw;
  }

  @media (max-width: 1225px) {
    margin-left: 15vw;
    width: 230px;
    height: 38px;
    font-size: 15px;
  }

  @media (max-width: 980px) {
    margin-left: 10vw;
    width: 220px;
    height: 36px;
    font-size: 14px;
  }

  @media (max-width: 810px) {
    margin-left: 7vw;
    width: 210px;
    height: 35px;
    font-size: 13.5px;
  }

  @media (max-width: 740px) {
    margin-left: 4vw;
    width: 200px;
    height: 34px;
    font-size: 13px;
  }

  @media (max-width: 490px) {
    margin-left: 2vw;
    width: 160px;
    height: 25px;
    font-size: 9px;
  }
`;

const ToListLink = styled.p`
  margin-top: 2vh;
  margin-bottom: 0;
  margin-left: 29vw;
  font-size: 14px;
  color: white;
  font-weight: bold;
  font-weight: bold;
  font-family: Arial, sans-serif;

  @media (max-width: 1800px) {
    margin-top: 2vh;
    margin-left: 26vw;
    font-size: 14px;
  }

  @media (max-width: 1225px) {
    margin-left: 18vw;
    font-size: 13.5px;
  }

  @media (max-width: 980px) {
    margin-left: 14vw;
    font-size: 13px;
  }

  @media (max-width: 810px) {
    margin-left: 10vw;
    font-size: 12.5px;
  }

  @media (max-width: 740px) {
    margin-left: 6vw;
    font-size: 12px;
  }

  @media (max-width: 490px) {
    margin-left: 4vw;
    font-size: 9px;
  }
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

  @media (max-width: 1225px) {
    margin-left: 15vw;
    font-size: 13.5px;
  }

  @media (max-width: 980px) {
    margin-left: 10vw;
    font-size: 13px;
  }

  @media (max-width: 810px) {
    margin-left: 7vw;
    font-size: 12.5px;
  }

  @media (max-width: 740px) {
    margin-left: 4vw;
    font-size: 12px;
  }

  @media (max-width: 490px) {
    margin-left: 3vw;
    font-size: 11.5px;
  }
`;

export default function CadastroPerfilCard() {
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

  console.log("Moradores recebidos:", Moradores);

  return (
    <>
      <Background>
        <Título>CADASTRE UM VEÍCULO</Título>
        <Botão onClick={() => setModalAberto(true)}>
          Clique aqui para cadastrar!
        </Botão>
      </Background>

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
