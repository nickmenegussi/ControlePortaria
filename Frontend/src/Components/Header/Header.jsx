import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderDiv = styled.header`
  background-color: #ffffff;
  display: flex;
  position: sticky;
  top: 0;
  /* justify-content: center; */
  align-items: center;
  padding: 35px;
  width: 100%;
  height: 13vh;
  margin: 0;
  box-sizing: border-box;
  /* margin-left: -8px; */
  border-top: none;
`;

const HomeTxt = styled(Link)`
  color: #007d49;
  justify-content: flex-start;
  font-size: 18px;
  margin-left: 2vw;
  margin-right: 28vw;
  flex-shrink: 0;
  font-family: Arial, sans-serif;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: #7cffb9;
  }
`;

const PerfisTxt = styled(Link)`
  color: black;
  margin-right: 8vw;
  font-size: 18px;
  flex-shrink: 0;
  font-family: Arial, sans-serif;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: #7cffb9;
  }
`;

const VeiculosTxt = styled(Link)`
  color: black;
  margin-right: 8vw;
  font-size: 18px;
  flex-shrink: 0;
  font-family: Arial, sans-serif;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: #7cffb9;
  }
`;

const ApartamentosTxt = styled(Link)`
  color: black;
  font-size: 18px;
  flex-shrink: 0;
  font-family: Arial, sans-serif;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: #7cffb9;
  }
`;

export default function Header() {
  return (
    <>
      <HeaderDiv>
        <HomeTxt to="/Home">Home</HomeTxt>
        <PerfisTxt to="/Perfis">Perfis</PerfisTxt>
        <VeiculosTxt to="/Veículos">Veículos</VeiculosTxt>
        <ApartamentosTxt to="/Apartamentos">Apartamentos</ApartamentosTxt>
      </HeaderDiv>
    </>
  );
}
