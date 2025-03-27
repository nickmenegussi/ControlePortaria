import "./index.css";
import HomePage from "./Components/Home/HomePage";
import Header from "./Components/Header/Header";
import CadastroPerfilCard from "./Components/Cards/CadastroPerfil.Card";
import CadastroVeiculoCard from "./Components/Cards/CadastroVeículo.Card";
import CadastroAPCard from "./Components/Cards/CadastroAP.Card";
import PerfisPage from "./Components/Perfis/PerfisPage";
import ApsPage from "./Components/Apartamentos/ApartamentosPage";
import VeiculosPage from "./Components/Veículos/VeículosPage";

export default function Home() {
  return (
    <>
      <Header />
      <HomePage>
        <CadastroPerfilCard />
        <CadastroVeiculoCard />
        <CadastroAPCard />
      </HomePage>
    </>
  );
}

export function Perfis() {
  return (
    <>
      <Header />
      <PerfisPage />
    </>
  );
}

export function APS() {
  return (
    <>
      <Header />
      <ApsPage />
    </>
  );
}

export function Veiculos() {
  return (
    <>
      <Header />
      <VeiculosPage />
    </>
  );
}
