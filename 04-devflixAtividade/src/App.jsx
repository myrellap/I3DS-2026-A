import { useCallback, useEffect, useState } from "react";
import "./App.css";

import logo from "./assets/bieberflix.png";
import lupa from "./assets/search-heart-fill.svg";

import Rodape from "./components/Rodape/Rodape";
import MovieCard from "./components/MovieCard/MovieCard";

const LANGUAGES = [
  { code: "pt", name: "🇧🇷 Português", flag: "🇵🇹" },
  { code: "en", name: "🇺🇸 English", flag: "🇺🇸" },
  { code: "es", name: "🇪🇸 Español", flag: "🇪🇸" },
  { code: "fr", name: "🇫🇷 Français", flag: "🇫🇷" },
  { code: "de", name: "🇩🇪 Deutsch", flag: "🇩🇪" },
  { code: "it", name: "🇮🇹 Italiano", flag: "🇮🇹" },
  { code: "ja", name: "🇯🇵 日本語", flag: "🇯🇵" },
  { code: "zh", name: "🇨🇳 中文", flag: "🇨🇳" },
];

const TRANSLATIONS = {
  pt: {
    themeLight: "☀️ Claro",
    themeDark: "🌙 Escuro",
    logoAlt:
      "Logotipo do serviço de streaming Devflix, com letras vermelhas e fundo preto, promovendo conteúdo de séries, filmes e entretenimento online.",
    searchPlaceholder: "Pesquise por filmes",
    searchAlt: "Botão de ação para pesquisa!",
    missingApiKey:
      "Configure a chave OMDB no arquivo .env (VITE_OMDB_API_KEY).",
    typeMovie: "Digite um nome de filme para pesquisar.",
    connectionFail: "Falha de conexão com a OMDB.",
    searchError: "Erro ao buscar filmes na OMDB.",
    loadingMovies: "🔎 Carregando filmes...",
    movieNotFound: "😢 Filme não encontrado 😢",
  },
  en: {
    themeLight: "☀️ Light",
    themeDark: "🌙 Dark",
    logoAlt:
      "Devflix streaming service logo, with red lettering and black background, promoting series, movies and online entertainment.",
    searchPlaceholder: "Search for movies",
    searchAlt: "Search action button!",
    missingApiKey:
      "Configure the OMDB key in the .env file (VITE_OMDB_API_KEY).",
    typeMovie: "Type a movie name to search.",
    connectionFail: "Connection failure with OMDB.",
    searchError: "Error while searching movies on OMDB.",
    loadingMovies: "🔎 Loading movies...",
    movieNotFound: "😢 Movie not found 😢",
  },
  es: {
    themeLight: "☀️ Claro",
    themeDark: "🌙 Oscuro",
    logoAlt:
      "Logotipo del servicio de streaming Devflix, con letras rojas y fondo negro, promoviendo series, películas y entretenimiento en línea.",
    searchPlaceholder: "Buscar películas",
    searchAlt: "¡Botón de acción de búsqueda!",
    missingApiKey:
      "Configura la clave OMDB en el archivo .env (VITE_OMDB_API_KEY).",
    typeMovie: "Escribe el nombre de una película para buscar.",
    connectionFail: "Error de conexión con OMDB.",
    searchError: "Error al buscar películas en OMDB.",
    loadingMovies: "🔎 Cargando películas...",
    movieNotFound: "😢 Película no encontrada 😢",
  },
  fr: {
    themeLight: "☀️ Clair",
    themeDark: "🌙 Sombre",
    logoAlt:
      "Logo du service de streaming Devflix, avec des lettres rouges sur fond noir, promouvant des séries, des films et du divertissement en ligne.",
    searchPlaceholder: "Rechercher des films",
    searchAlt: "Bouton d'action de recherche !",
    missingApiKey:
      "Configurez la clé OMDB dans le fichier .env (VITE_OMDB_API_KEY).",
    typeMovie: "Tapez le nom d'un film pour rechercher.",
    connectionFail: "Échec de connexion à OMDB.",
    searchError: "Erreur lors de la recherche de films sur OMDB.",
    loadingMovies: "🔎 Chargement des films...",
    movieNotFound: "😢 Film introuvable 😢",
  },
  de: {
    themeLight: "☀️ Hell",
    themeDark: "🌙 Dunkel",
    logoAlt:
      "Logo des Devflix-Streamingdienstes mit roter Schrift auf schwarzem Hintergrund für Serien, Filme und Online-Unterhaltung.",
    searchPlaceholder: "Filme suchen",
    searchAlt: "Such-Aktionsschaltfläche!",
    missingApiKey:
      "Konfigurieren Sie den OMDB-Schlüssel in der .env-Datei (VITE_OMDB_API_KEY).",
    typeMovie: "Geben Sie einen Filmnamen zur Suche ein.",
    connectionFail: "Verbindungsfehler mit OMDB.",
    searchError: "Fehler bei der Filmsuche in OMDB.",
    loadingMovies: "🔎 Filme werden geladen...",
    movieNotFound: "😢 Film nicht gefunden 😢",
  },
  it: {
    themeLight: "☀️ Chiaro",
    themeDark: "🌙 Scuro",
    logoAlt:
      "Logo del servizio di streaming Devflix, con scritte rosse e sfondo nero, che promuove serie, film e intrattenimento online.",
    searchPlaceholder: "Cerca film",
    searchAlt: "Pulsante azione di ricerca!",
    missingApiKey:
      "Configura la chiave OMDB nel file .env (VITE_OMDB_API_KEY).",
    typeMovie: "Digita il nome di un film da cercare.",
    connectionFail: "Errore di connessione con OMDB.",
    searchError: "Errore durante la ricerca dei film su OMDB.",
    loadingMovies: "🔎 Caricamento film...",
    movieNotFound: "😢 Film non trovato 😢",
  },
  ja: {
    themeLight: "☀️ ライト",
    themeDark: "🌙 ダーク",
    logoAlt:
      "赤い文字と黒い背景の Devflix ストリーミングサービスのロゴ。シリーズ、映画、オンラインエンターテインメントを紹介します。",
    searchPlaceholder: "映画を検索",
    searchAlt: "検索アクションボタン!",
    missingApiKey:
      ".env ファイルに OMDB キーを設定してください (VITE_OMDB_API_KEY)。",
    typeMovie: "検索する映画名を入力してください。",
    connectionFail: "OMDB との接続に失敗しました。",
    searchError: "OMDB で映画を検索中にエラーが発生しました。",
    loadingMovies: "🔎 映画を読み込み中...",
    movieNotFound: "😢 映画が見つかりません 😢",
  },
  zh: {
    themeLight: "☀️ 浅色",
    themeDark: "🌙 深色",
    logoAlt:
      "Devflix 流媒体服务标志，红色字体配黑色背景，推广剧集、电影和在线娱乐。",
    searchPlaceholder: "搜索电影",
    searchAlt: "搜索按钮！",
    missingApiKey: "请在 .env 文件中配置 OMDB 密钥 (VITE_OMDB_API_KEY)。",
    typeMovie: "请输入要搜索的电影名称。",
    connectionFail: "与 OMDB 连接失败。",
    searchError: "在 OMDB 搜索电影时出错。",
    loadingMovies: "🔎 正在加载电影...",
    movieNotFound: "😢 未找到电影 😢",
  },
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light",
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("devflix-language") || "pt",
  );
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.pt;

  //Utilizando uma CHAVE de API do arquivo .env
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const apiUrl = "https://www.omdbapi.com/";

  //Criando a conexão com a API e trazendo informações
  const searchMovies = useCallback(
    async (title) => {
      const query = (title || "").trim();

      if (!apiKey) {
        setMovies([]);
        setErrorMessage(t.missingApiKey);
        return;
      }

      if (!query) {
        setMovies([]);
        setErrorMessage(t.typeMovie);
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
          throw new Error(t.connectionFail);
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
        setErrorMessage(error.message || t.searchError);
      } finally {
        setIsLoading(false);
      }
    },
    [apiKey, apiUrl, t],
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

  const handleLanguageChange = (languageCode) => {
    setLanguage(languageCode);
    localStorage.setItem("devflix-language", languageCode);
    setIsLanguageOpen(false);
  };

  return (
    <div id="App">
      <button className="themeToggle" onClick={toggleTheme}>
        {theme === "dark" ? t.themeLight : t.themeDark}
      </button>

      <div className="languageSelector">
        <button
          className="languageToggle"
          onClick={() => setIsLanguageOpen(!isLanguageOpen)}
        >
          {LANGUAGES.find((lang) => lang.code === language)?.flag}{" "}
          {language.toUpperCase()}
        </button>

        {isLanguageOpen && (
          <div className="languageDropdown">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                className={`languageOption ${language === lang.code ? "active" : ""}`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                {lang.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <img id="Logo" src={logo} alt={t.logoAlt} />

      <div className="search">
        <input
          onKeyDown={(e) => e.key === "Enter" && searchMovies(search)}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder={t.searchPlaceholder}
        />
        <img
          onClick={() => searchMovies(search)}
          src={lupa}
          alt={t.searchAlt}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard
              key={index}
              {...movie}
              apiUrl={apiUrl}
              apiKey={apiKey}
              language={language}
            />
          ))}
        </div>
      ) : isLoading ? (
        <h2 className="empty">{t.loadingMovies}</h2>
      ) : errorMessage ? (
        <h2 className="empty">😢 {errorMessage}</h2>
      ) : (
        <h2 className="empty">{t.movieNotFound}</h2>
      )}

      <Rodape link={"https://github.com/myrellap"}>myrella</Rodape>
    </div>
  );
};

export default App;
