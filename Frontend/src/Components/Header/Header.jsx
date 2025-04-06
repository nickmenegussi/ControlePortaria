import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderDiv = styled.header`
  background-color: #ffffff;
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  padding: 35px;
  width: 100%;
  height: 13vh;
  margin: 0;
  box-sizing: border-box;
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

  @media (max-width: 1203px) {
    font-size: 18px;
    margin-right: 27vw;
  }

  @media (max-width: 1039px) {
    font-size: 17px;
    margin-right: 25vw;
  }

  @media (max-width: 855px) {
    font-size: 16px;
    margin-right: 20vw;
  }

  @media (max-width: 665px) {
    font-size: 14px;
    margin-right: 17vw;
  }

  @media (max-width: 410px) {
    font-size: 10px;
    margin-left: 1vw;
    margin-right: 13vw;
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

  @media (max-width: 1203px) {
    font-size: 18px;
  }

  @media (max-width: 1039px) {
    font-size: 17px;
  }

  @media (max-width: 855px) {
    font-size: 16px;
  }

  @media (max-width: 665px) {
    font-size: 14px;
  }

  @media (max-width: 410px) {
    font-size: 10px;
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

  @media (max-width: 1203px) {
    font-size: 18px;
  }

  @media (max-width: 1039px) {
    font-size: 17px;
  }

  @media (max-width: 855px) {
    font-size: 16px;
  }

  @media (max-width: 665px) {
    font-size: 14px;
  }

  @media (max-width: 410px) {
    font-size: 10px;
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

  @media (max-width: 1203px) {
    font-size: 18px;
  }

  @media (max-width: 1039px) {
    font-size: 17px;
  }

  @media (max-width: 855px) {
    font-size: 16px;
  }

  @media (max-width: 665px) {
    font-size: 14px;
  }

  @media (max-width: 410px) {
    font-size: 10px;
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
