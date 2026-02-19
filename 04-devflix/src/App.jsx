
import { useState } from "react";
import "./App.css";

import logo from "./assets/devflix.png";
import lupa from "./assets/search.svg";
import Rodape from "./components/Rodape/Rodape";

const App = () => {
 const [movies, setMovies] = useState([]);

 // utilizando uma CHAVE de API do arquivo .env
 const apikey = import.meta.env.VITE_OMDB_API_KEY;
const apiUrl = `https:omdbapi.com/?apikey=${apiKey}`;

//Criando a conexão com a API e trazendo informações
const searchMovies = async (title) => {
  const response = await fetch(`${apiUrl}&s={title}`);
  const data = await response.json;

  //Alimentando a variavel movies
}
  return (
    <div id="App">
      <img
        id="logo"
        src={logo}
        alt="Logo da plataforma de streaming DEVFLIX em destaque, com cores vibrantes e design moderno, ideal para quem busca serviços de entretenimento online."
      />

      <div className="search">
        <input type="text" placeholder="Pesquise por filmes" />
        <img src={lupa} alt="Botão de ação para pesquisa!" />
      </div>
     

      <Rodape link={"https://github.com/myrellap"} >myrella</Rodape>
    </div>
  );
};

export default App;