import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  listarPerfil,
  atualizarPerfil,
  deletarPerfil,
} from "../../../Services/Api";
import { Link } from "react-router-dom";

const Background = styled.div`
  background-color: #696969;
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
  margin: 0;
  padding: 0;
  overflow-y: auto;
  position: absolute;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 90%;
`;

const Card = styled.div`
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
  font-weight: bold;
  font-family: Arial, sans-serif;
`;

const Button = styled.button`
  margin-top: 20px;
  display: block;
  width: 250px;
  height: 40px;
  margin-top: 5vh;
  margin-left: 18vw;
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
  margin-top: 20px;
  display: block;
  width: 250px;
  height: 40px;
  margin-top: 5vh;
  margin-left: 18vw;
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

export default function PerfisPage() {
  const [perfis, setPerfis] = useState([]);
  const [perfilEditando, setPerfilEditando] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    carregarPerfis();
  }, []);

  const carregarPerfis = async () => {
    try {
      const data = await listarPerfil();
      console.log("Resposta da API:", data);
      setPerfis(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Erro ao carregar perfis:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletarPerfil(id);
      setPerfis(perfis.filter((perfil) => perfil.idMoradores !== id)); // Corrigido
    } catch (error) {
      console.error("Erro ao deletar perfil:", error);
    }
  };

  const abrirModalEdicao = (perfil) => {
    setPerfilEditando(perfil);
    setModalAberto(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!perfilEditando) return;

    try {
      await atualizarPerfil(
        perfilEditando.idMoradores,
        perfilEditando.nome,
        perfilEditando.telefone,
        perfilEditando.email,
        perfilEditando.status
      );

      setPerfis((prevPerfis) =>
        prevPerfis.map((perfil) =>
          perfil.idMoradores === perfilEditando.idMoradores
            ? perfilEditando
            : perfil
        )
      );

      setModalAberto(false);
      setPerfilEditando(null);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  return (
    <>
      <Background>
        <CardContainer>
          {perfis.map((perfil) => (
            <Card key={perfil.idMoradores}>
              <h2>{perfil.nome}</h2>
              <p>Telefone: {perfil.telefone}</p>
              <p>Email: {perfil.email}</p>
              <EditButton onClick={() => abrirModalEdicao(perfil)}>
                Editar
              </EditButton>
              <Button onClick={() => handleDelete(perfil.idMoradores)}>
                Deletar
              </Button>
            </Card>
          ))}
        </CardContainer>
      </Background>

      {modalAberto && perfilEditando && (
        <ModalFundo>
          <ModalConteúdo>
            <FecharBotão
              onClick={() => {
                setModalAberto(false);
                setPerfilEditando(null);
              }}
            >
              ✖
            </FecharBotão>
            <TítuloModal>Editar Perfil</TítuloModal>

            <form onSubmit={handleUpdate}>
              <Label>Nome:</Label>
              <Input
                type="text"
                value={perfilEditando.nome}
                onChange={(e) =>
                  setPerfilEditando({ ...perfilEditando, nome: e.target.value })
                }
              />

              <Label>Telefone:</Label>
              <Input
                type="text"
                value={perfilEditando.telefone}
                onChange={(e) =>
                  setPerfilEditando({
                    ...perfilEditando,
                    telefone: e.target.value,
                  })
                }
              />

              <Label>Email:</Label>
              <Input
                type="text"
                value={perfilEditando.email}
                onChange={(e) =>
                  setPerfilEditando({
                    ...perfilEditando,
                    email: e.target.value,
                  })
                }
              />

              <Label>Status:</Label>
              <select
                value={perfilEditando.status}
                onChange={(e) =>
                  setPerfilEditando({
                    ...perfilEditando,
                    status: e.target.value,
                  })
                }
              >
                <option value="">Selecione um status</option>
                <option value="residente">Residente</option>
                <option value="proprietario">Proprietário</option>
                <option value="visitante">Visitante</option>
              </select>
              <SubmitButton type="submit">Salvar</SubmitButton>
              <SubmitButton
                type="button"
                onClick={() => {
                  setModalAberto(false);
                  setPerfilEditando(null);
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
