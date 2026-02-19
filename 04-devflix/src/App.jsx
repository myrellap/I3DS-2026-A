import "./App.css";

import logo from "./assets/devflix.png";
import lupa from "./assets/search (1).svg";
import Rodape from "./components/Rodape/Rodape";

const App = () => {
  return (
    <div id="App">
      <img
        className="logo"
        src={logo}
        alt="Imagem do logo do serviço de streaming Netflix, conhecido internacionalmente, com letras vermelhas sobre fundo preto, promovendo conteúdo de streaming."
      />

      <div className="search">
        <input type="text" placeholder="Pesquise por filmes e séries..." />
        <img src={lupa} alt="Botão de ação para pesquisa!" />
      </div>
      
      <Rodape link={"https://github.com/myrellap"}>Myrella</Rodape>
    </div>
  );
};

export default App;
