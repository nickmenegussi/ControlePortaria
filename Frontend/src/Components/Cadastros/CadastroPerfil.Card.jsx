import styled from "styled-components";

const Background = styled.div`
    background-color: white;
    display: flex;
    width: 28vw;
    height: 35vh;
    margin-top: 25vh;
    margin-left: 2vw;
    border-radius: 10px;
    align-itens: center;
`;

const Título = styled.h2`
  font-weight: bold;
  font-family: Arial, sans-serif;
`;

const Botão = styled.div`
    margin-top: 50px;
    display: block;
    width: 250px;
    height: 40px;
    margin-top: 50px;
    margin-bottom: -10px;
    margin-left: 180px;
    padding: 10px;
    background-color: #00cc66;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;

    &:hover {
    background-color: #00994d;
    }
`

export default function CadastroPerfilCard () {
    return (
        <Background>
            <Título>CADASTRE UM PERFIL</Título>
            <Botão>Clique aqui para cadastrar!</Botão>
        </Background>
    )
};

