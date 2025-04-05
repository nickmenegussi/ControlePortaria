import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  listarVeiculo,
  atualizarVeiculo,
  deletarVeiculo,
} from "../../../Services/Veiculos.Api";
import { listarPerfil } from "../../../Services/Perfis.Api";
import { Link } from "react-router-dom";
import AddVeiculoButton from "../Buttons/AddVeículo";

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

export default function VeiculosPage() {
  const [veiculos, setVeiculos] = useState([]);
  const [veiculoEditando, setVeiculoEditando] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [Moradores, setMoradores] = useState([]);

  useEffect(() => {
    carregarVeiculos();
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

  const carregarVeiculos = async () => {
    try {
      const data = await listarVeiculo();
      console.log("Resposta da API:", data);
      setVeiculos(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Erro ao carregar veículos:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletarVeiculo(id);
      setVeiculos(veiculos.filter((veiculo) => veiculo.idVeiculos !== id));
    } catch (error) {
      console.error("Erro ao deletar veiculo:", error);
    }
  };

  const abrirModalEdicao = (veiculo) => {
    setVeiculoEditando({ ...veiculo });
    setModalAberto(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!veiculoEditando) return;

    try {
      await atualizarVeiculo(
        veiculoEditando.idVeiculos,
        veiculoEditando.placa,
        veiculoEditando.modelo,
        veiculoEditando.cor,
        veiculoEditando.Box,
        veiculoEditando.Moradores_id
      );

      await carregarVeiculos();

      setModalAberto(false);
      setVeiculoEditando(null);
    } catch (error) {
      console.error("Erro ao atualizar veiculo:", error);
    }
  };

  return (
    <>
      <Background>
        <AddVeiculoButton />
        <CardContainer>
          {veiculos.map((veiculo) => (
            <Card key={veiculo.idVeiculos}>
              <TituloCard>
                <h2>{veiculo.modelo}</h2>
              </TituloCard>
              <Texts>
                <p>Placa: {veiculo.placa}</p>
              </Texts>
              <Texts>
                <p>Cor: {veiculo.cor}</p>
              </Texts>
              <Texts>
                <p>Vaga: {veiculo.Box}</p>
              </Texts>
              <Texts>
                <p>Dono: {veiculo.nome}</p>
              </Texts>
              <EditButton onClick={() => abrirModalEdicao(veiculo)}>
                Editar
              </EditButton>
              <Button onClick={() => handleDelete(veiculo.idVeiculos)}>
                Deletar
              </Button>
            </Card>
          ))}
        </CardContainer>
      </Background>

      {modalAberto && veiculoEditando && (
        <ModalFundo>
          <ModalConteúdo>
            <FecharBotão
              onClick={() => {
                setModalAberto(false);
                setVeiculoEditando(null);
              }}
            >
              ✖
            </FecharBotão>
            <TítuloModal>Editar Veículo</TítuloModal>

            <form onSubmit={handleUpdate}>
              <Label>Placa:</Label>
              <Input
                type="text"
                value={veiculoEditando.placa}
                onChange={(e) =>
                  setVeiculoEditando({
                    ...veiculoEditando,
                    placa: e.target.value,
                  })
                }
              />

              <Label>Modelo:</Label>
              <Input
                type="text"
                value={veiculoEditando.modelo}
                onChange={(e) =>
                  setVeiculoEditando({
                    ...veiculoEditando,
                    modelo: e.target.value,
                  })
                }
              />

              <Label>Cor:</Label>
              <Input
                type="text"
                value={veiculoEditando.cor}
                onChange={(e) =>
                  setVeiculoEditando({
                    ...veiculoEditando,
                    cor: e.target.value,
                  })
                }
              />

              <Label>Box:</Label>
              <Input
                type="text"
                value={veiculoEditando.Box}
                onChange={(e) =>
                  setVeiculoEditando({
                    ...veiculoEditando,
                    Box: e.target.value,
                  })
                }
              />

              <Label>Dono:</Label>
              <select
                value={veiculoEditando.Moradores_id}
                onChange={(e) =>
                  setVeiculoEditando({
                    ...veiculoEditando,
                    Moradores_id: e.target.value,
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
                  setVeiculoEditando(null);
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
