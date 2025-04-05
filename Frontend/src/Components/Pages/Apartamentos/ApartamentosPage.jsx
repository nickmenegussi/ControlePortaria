import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  listarApartamento,
  atualizarApartamento,
  deletarApartamento,
} from "../../../Services/Aps.Api";
import { listarPerfil } from "../../../Services/Perfis.Api";
import { Link } from "react-router-dom";
import AddAPButton from "../Buttons/AddAp";

const Background = styled.div`
  background-color: #696969;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 60px);
  // margin: 0;
  padding: 20px 0;
  overflow-y: auto;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 4vh;
  padding-bottom: 90px; /* Espaço extra no final */
  width: 100%;
`;

const Card = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  min-height: 350px;
  padding: 20px;
  border-radius: 10px;
  font-weight: bold;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TituloCard = styled.div`
  display: flex;
  margin-top: 2vh;
  margin-bottom: 0;
  font-weight: bold;
  font-family: Arial, sans-serif;
`;

const Texts = styled.div`
  display: flex;
  // margin-bottom: 1px;
  font-weight: bold;
  font-family: Arial, sans-serif;
`;

const Button = styled.button`
  margin-top: 20px;
  width: 250px;
  height: 40px;
  margin-top: 2vh;
  padding: 10px;
  background-color: #ff0000;
  color: white;
  font-weight: bold;
  font-family: Arial, sans-serif;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #520000;
  }
`;

const EditButton = styled.button`
  margin-top: 1vh;
  width: 250px;
  height: 40px;
  margin-top: 5vh;
  padding: 10px;
  background-color: #000000;
  color: white;
  font-weight: bold;
  font-family: Arial, sans-serif;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #191919;
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
  margin-top: 5vh;
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

export default function ApsPage() {
  const [apartamentos, setApartamentos] = useState([]);
  const [apartamentoEditando, setApartamentoEditando] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [Moradores, setMoradores] = useState([]);

  useEffect(() => {
    carregarApartamentos();
    carregarMoradores();
  }, []);

  const carregarMoradores = async () => {
    try {
      const response = await listarPerfil();
      setMoradores(response.data);
    } catch (error) {
      console.error("Erro ao carregar moradores:", error);
    }
  };

  const carregarApartamentos = async () => {
    try {
      const data = await listarApartamento();
      console.log("Resposta da API:", data);
      setApartamentos(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Erro ao carregar apartamentos:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletarApartamento(id);
      setApartamentos(
        apartamentos.filter((apartamento) => apartamento.idApartamento !== id)
      );
    } catch (error) {
      console.error("Erro ao deletar veiculo:", error);
    }
  };

  const abrirModalEdicao = (apartamento) => {
    setApartamentoEditando({ ...apartamento });
    setModalAberto(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!apartamentoEditando) return;

    try {
      await atualizarApartamento(
        apartamentoEditando.idApartamento,
        apartamentoEditando.numeroApartamento,
        apartamentoEditando.bloco,
        apartamentoEditando.idMorador
      );

      await carregarApartamentos();

      setModalAberto(false);
      setApartamentoEditando(null);
    } catch (error) {
      console.error("Erro ao atualizar apartamento:", error);
    }
  };

  return (
    <>
      <Background>
        <AddAPButton />
        <CardContainer>
          {apartamentos.map((apartamento) => (
            <Card key={apartamento.idApartamento}>
              <TituloCard>
                <h2>{apartamento.numeroApartamento}</h2>
              </TituloCard>
              <Texts>
                <p>Bloco: {apartamento.bloco}</p>
              </Texts>
              <Texts>
                <p>Dono: {apartamento.nome}</p>
              </Texts>
              <EditButton onClick={() => abrirModalEdicao(apartamento)}>
                Editar
              </EditButton>
              <Button onClick={() => handleDelete(apartamento.idApartamento)}>
                Deletar
              </Button>
            </Card>
          ))}
        </CardContainer>
      </Background>

      {modalAberto && apartamentoEditando && (
        <ModalFundo>
          <ModalConteúdo>
            <FecharBotão
              onClick={() => {
                setModalAberto(false);
                setApartamentoEditando(null);
              }}
            >
              ✖
            </FecharBotão>
            <TítuloModal>Editar Apartamento</TítuloModal>

            <form onSubmit={handleUpdate}>
              <Label>Número do Apartamento:</Label>
              <Input
                type="text"
                value={apartamentoEditando.numeroApartamento}
                onChange={(e) =>
                  setApartamentoEditando({
                    ...apartamentoEditando,
                    numeroApartamento: e.target.value,
                  })
                }
              />

              <Label>Bloco:</Label>
              <Input
                type="text"
                value={apartamentoEditando.bloco}
                onChange={(e) =>
                  setApartamentoEditando({
                    ...apartamentoEditando,
                    bloco: e.target.value,
                  })
                }
              />

              <Label>Dono:</Label>
              <select
                value={apartamentoEditando.idMorador}
                onChange={(e) =>
                  setApartamentoEditando({
                    ...apartamentoEditando,
                    idMorador: e.target.value,
                  })
                }
              >
                <option value="">Selecione o nome do dono</option>
                {Moradores.map((morador) => (
                  <option key={morador.idMoradores} value={morador.idMoradores}>
                    {morador.nome}
                  </option>
                ))}
              </select>
              <SubmitButton type="submit">Salvar</SubmitButton>
              <SubmitButton
                type="button"
                onClick={() => {
                  setModalAberto(false);
                  setApartamentoEditando(null);
                }}
              >
                Cancelar
              </SubmitButton>
            </form>
          </ModalConteúdo>
        </ModalFundo>
      )}
    </>
  );
}
