import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { cadastrarPerfil } from "../../../Services/Perfis.Api";

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

export default function AddPerfilButton() {
  const [modalAberto, setModalAberto] = useState(false);
  //estados para armazenar os valores dos Inputs
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState(""); // Estado para armazenar mensagens de erro ou sucesso

  //isso será chamado assim que o formulário for enviado
  const handleSubmit = async (event) => {
    event.preventDefault(); //evita que a página recarregue

    if (!nome || !telefone || !email || !status) {
      // Verifica se todos os campos estão preenchidos
      setMessage("Preencha todos os campos!");
      return;
    }

    try {
      const response = await cadastrarPerfil(nome, telefone, email, status); // Chama a função de cadastro da API

      if (response.error) {
        setMessage(`Erro: ${response.error}`);
      } else {
        setMessage("Perfil cadastrado com sucesso!");
        //limpa os campos do formulário após o cadastro
        setNome("");
        setEmail("");
        setTelefone("");
        setStatus("");
      }
    } catch (error) {
      console.error("Erro ao cadastrar Perfil:", error);
      setMessage("Erro ao cadastrar Perfil.");
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
            <TítuloModal>Cadastro de Perfil</TítuloModal>

            <form onSubmit={handleSubmit}>
              <Label>Nome:</Label>
              <Input
                type="text"
                placeholder="Digite o nome da pessoa"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              <Label>Telefone:</Label>
              <Input
                type="text"
                placeholder="Digite o telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />

              <Label>Email:</Label>
              <Input
                type="text"
                placeholder="Digite o email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Label>Status:</Label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Selecione um status</option>
                <option value="residente">Residente</option>
                <option value="proprietario">Proprietário</option>
                <option value="visitante">Visitante</option>
              </select>
              <SubmitButton type="submit">Pronto!</SubmitButton>
            </form>

            <ToListLink>
              <StyledLink to="/Perfis">Ver lista de perfis</StyledLink>
            </ToListLink>
            {message && <Message>{message}</Message>}
          </ModalConteúdo>
        </ModalFundo>
      )}
    </>
  );
}
