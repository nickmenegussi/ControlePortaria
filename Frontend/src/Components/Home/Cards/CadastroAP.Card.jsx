import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { cadastrarApartamento } from "../../../Services/Aps.Api";
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
`;

const Título = styled.h2`
  font-weight: bold;
  font-family: Arial, sans-serif;
  text-align: center;
  margin-bottom: 80px;
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

export default function CadastroPerfilCard() {
  const [modalAberto, setModalAberto] = useState(false);
  const [numeroApartamento, setNumeroApartamento] = useState("");
  const [bloco, setBloco] = useState("");
  const [Moradores, setMoradores] = useState([]);
  const [idMorador, setidMorador] = useState("");
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

    if (!numeroApartamento || !bloco || !idMorador) {
      setMessage("Preencha todos os campos!");
      return;
    }

    try {
      await cadastrarApartamento(
        Number(numeroApartamento),
        bloco,
        Number(idMorador)
      );

      setMessage("Apartamento cadastrado com sucesso!");
      setNumeroApartamento("");
      setBloco("");
      setidMorador("");
    } catch (error) {
      console.error("Erro ao cadastrar apartamento:", error.message);
      setMessage(error.message);
    }
  };

  console.log("Moradores recebidos:", Moradores);

  return (
    <>
      <Background>
        <Título>CADASTRE UM APARTAMENTO</Título>
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
            <TítuloModal>Cadastro de Apartamento</TítuloModal>

            <form onSubmit={handleSubmit}>
              <Label>Número do Apartamento:</Label>
              <Input
                type="text"
                placeholder="Digite o número do apartamento"
                value={numeroApartamento}
                onChange={(e) => setNumeroApartamento(e.target.value)}
              />

              <Label>Bloco do Apartamento:</Label>
              <Input
                type="text"
                placeholder="Digite o bloco do apartamento"
                value={bloco}
                onChange={(e) => setBloco(e.target.value)}
              />

              <Label>Dono:</Label>
              <select
                value={idMorador}
                onChange={(e) => setidMorador(e.target.value)}
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
              <StyledLink to="/Apartamentos">
                Ver lista de apartamentos
              </StyledLink>
            </ToListLink>
            {message && <Message>{message}</Message>}
          </ModalConteúdo>
        </ModalFundo>
      )}
    </>
  );
}
