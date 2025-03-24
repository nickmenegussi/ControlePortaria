import HomePage from "./Components/Home/HomePage";
import Header from "./Components/Header/Header";
import CadastroPerfilModal from "./Components/Cadastros/CadastroPerfil.Modal";
import CadastroVeiculoModal from "./Components/Cadastros/CadastroVeículo.Modal";
import CadastroApModal from "./Components/Cadastros/CadastroAP.Modal";

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
