import "./index.css";
import HomePage from "./Components/Home/HomePage";
import Header from "./Components/Header/Header";
import CadastroPerfilCard from "./Components/Home/Cards/CadastroPerfil.Card";
import CadastroVeiculoCard from "./Components/Home/Cards/CadastroVeículo.Card";
import CadastroAPCard from "./Components/Home/Cards/CadastroAP.Card";
import PerfisPage from "./Components/Pages/Perfis/PerfisPage";
import ApsPage from "./Components/Pages/Apartamentos/ApartamentosPage";
import VeiculosPage from "./Components/Pages/Veículos/VeículosPage";
// import AddPerfilButton from "./Components/Pages/Buttons/AddPerfil";
import AddVeiculoButton from "./Components/Pages/Buttons/AddVeículo";
import AddAPButton from "./Components/Pages/Buttons/AddAp";

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
      <PerfisPage>
      </PerfisPage>
    </>
  );
}

export function Veiculos() {
  return (
    <>
      <Header />
      <VeiculosPage>
        <AddVeiculoButton />
      </VeiculosPage>
    </>
  );
}

export function APS() {
  return (
    <>
      <Header />
      <ApsPage>
        <AddAPButton />
      </ApsPage>
    </>
  );
}
