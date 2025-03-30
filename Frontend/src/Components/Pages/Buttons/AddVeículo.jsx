import { useState } from "react";
import styled from "styled-components";

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

export default function AddVeiculoButton() {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <>
      <Botão onClick={() => setModalAberto(true)}>+</Botão>

      {modalAberto && (
        <ModalFundo>
          <ModalConteúdo>
            <FecharBotão onClick={() => setModalAberto(false)}>✖</FecharBotão>
            <TítuloModal>Cadastro de Veículo</TítuloModal>
            {/* <form onSubmit={handleSubmit}>  */}
            <Label>Placa:</Label>
            <Input
              type="text"
              placeholder="Digite a placa do veículo"
              // value={licensePlate}
              // onChange={(e) => setLicensePlate(e.target.value)}
            />

            <Label>Modelo:</Label>
            <Input
              type="text"
              placeholder="Digite o modelo do veículo"
              // value={nameOwner}
              // onChange={(e) => setNameOwner(e.target.value)}
            />

            <Label>Cor:</Label>
            <Input
              type="text"
              placeholder="Digite a cor do veículo"
              // value={ownerCelphone}
              // onChange={(e) => setOwnerCelphone(e.target.value)}
            />

            <Label>Status:</Label>
            <Input
              type="text"
              placeholder="Digite o status"
              // value={ownerCelphone}
              // onChange={(e) => setOwnerCelphone(e.target.value)}
            />
            <SubmitButton type="submit">Pronto!</SubmitButton>
            {/* </form> */}
          </ModalConteúdo>
        </ModalFundo>
      )}
    </>
  );
}
