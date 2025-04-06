import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { cadastrarApartamento } from "../../../Services/Aps.Api";
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

  @media (max-width: 565px) {
    width: 30px;
    height: 30px;
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
  margin-left: 21.5vw;
  font-size: 14px;
  color: white;
  font-weight: bold;
  font-weight: bold;
  font-family: Arial, sans-serif;

  @media (max-width: 1800px) {
    margin-left: 20vw;
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

export default function AddAPButton() {
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
