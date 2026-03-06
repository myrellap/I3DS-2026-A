import { useCallback, useEffect, useState } from "react";
import "./App.css";

import logo from "./assets/bieberflix.png";
import lupa from "./assets/search-heart-fill.svg";

import Rodape from "./components/Rodape/Rodape";
import MovieCard from "./components/MovieCard/MovieCard";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light",
  );

  //Utilizando uma CHAVE de API do arquivo .env
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const apiUrl = "https://www.omdbapi.com/";

  //Criando a conexão com a API e trazendo informações
  const searchMovies = useCallback(
    async (title) => {
      const query = (title || "").trim();

      if (!apiKey) {
        setMovies([]);
        setErrorMessage(
          "Configure a chave OMDB no arquivo .env (VITE_OMDB_API_KEY).",
        );
        return;
      }

      if (!query) {
        setMovies([]);
        setErrorMessage("Digite um nome de filme para pesquisar.");
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const params = new URLSearchParams({
          apikey: apiKey,
          s: query,
        });

        const response = await fetch(`${apiUrl}?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Falha de conexão com a OMDB.");
        }

        const data = await response.json();

        if (data.Response === "False") {
          setMovies([]);
          setErrorMessage(data.Error || "Filme não encontrado.");
          return;
        }

        //Alimentando a variavel movies
        setMovies(data.Search || []);
      } catch (error) {
        setMovies([]);
        setErrorMessage(error.message || "Erro ao buscar filmes na OMDB.");
      } finally {
        setIsLoading(false);
      }
    },
    [apiKey, apiUrl],
  );

  useEffect(() => {
    (async () => {
      await searchMovies("Justin Bieber"); // termo para pesquisa ao carregar o site
    })();
  }, [searchMovies]);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem("devflix-theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <div id="App">
      <button className="themeToggle" onClick={toggleTheme}>
        {theme === "dark" ? "☀️ Ligth" : "🌙 Dark"}
      </button>

      <img
        id="Logo"
        src={logo}
        alt="Logotipo do serviço de streaming Devflix, com letras vermelhas e fundo preto, promovendo conteúdo de séries, filmes e entretenimento online."
      />

      <div className="search">
        <input
          onKeyDown={(e) => e.key === "Enter" && searchMovies(search)}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Pesquise por filmes"
        />
        <img
          onClick={() => searchMovies(search)}
          src={lupa}
          alt="Botão de ação para pesquisa!"
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard key={index} {...movie} apiUrl={apiUrl} apiKey={apiKey} />
          ))}
        </div>
      ) : isLoading ? (
        <h2 className="empty">🔎 Carregando filmes...</h2>
      ) : errorMessage ? (
        <h2 className="empty">😢 {errorMessage}</h2>
      ) : (
        <h2 className="empty">😢 Filme não encontrado 😢</h2>
      )}

      <Rodape link={"https://github.com/myrellap"}>myrella</Rodape>
    </div>
  );
};

export default App;
