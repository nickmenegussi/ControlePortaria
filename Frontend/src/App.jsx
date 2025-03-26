import "./index.css";
import HomePage from "./Components/Home/HomePage";
import Header from "./Components/Header/Header";
import CadastroPerfilModal from "./Components/Cadastros/CadastroPerfil.Card";
import CadastroVeiculoModal from "./Components/Cadastros/CadastroVeículo.Card";
import CadastroApModal from "./Components/Cadastros/CadastroAP.Card";

export default function Home() {
  return (
    <>
      <Header />
      <HomePage>
        <CadastroPerfilModal />
        <CadastroVeiculoModal />
        <CadastroApModal />
      </HomePage>
    </>
  );
}
