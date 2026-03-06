import { useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";

const TRANSLATIONS = {
  pt: {
    rating: "Avaliação",
    duration: "Duração",
    cast: "Elenco",
    genre: "Gênero",
    synopsis: "Sinopse",
    loading: "Carregando detalhes...",
    watch: "Assistir",
  },
  en: {
    rating: "Rating",
    duration: "Duration",
    cast: "Cast",
    genre: "Genre",
    synopsis: "Synopsis",
    loading: "Loading details...",
    watch: "Watch",
  },
  es: {
    rating: "Calificación",
    duration: "Duración",
    cast: "Reparto",
    genre: "Género",
    synopsis: "Sinopsis",
    loading: "Cargando detalles...",
    watch: "Ver",
  },
  fr: {
    rating: "Note",
    duration: "Durée",
    cast: "Distribution",
    genre: "Genre",
    synopsis: "Synopsis",
    loading: "Chargement des détails...",
    watch: "Regarder",
  },
  de: {
    rating: "Bewertung",
    duration: "Dauer",
    cast: "Besetzung",
    genre: "Genre",
    synopsis: "Zusammenfassung",
    loading: "Details werden geladen...",
    watch: "Ansehen",
  },
  it: {
    rating: "Valutazione",
    duration: "Durata",
    cast: "Cast",
    genre: "Genere",
    synopsis: "Sinossi",
    loading: "Caricamento dettagli...",
    watch: "Guarda",
  },
  ja: {
    rating: "評価",
    duration: "上映時間",
    cast: "キャスト",
    genre: "ジャンル",
    synopsis: "あらすじ",
    loading: "詳細を読み込んでいます...",
    watch: "視聴する",
  },
  zh: {
    rating: "评分",
    duration: "时长",
    cast: "演员",
    genre: "类型",
    synopsis: "简介",
    loading: "正在加载详情...",
    watch: "观看",
  },
};

const MovieDescription = (props) => {
  const [movieDesc, setMovieDesc] = useState([]);
  const [translatedData, setTranslatedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const labels = TRANSLATIONS[props.language] || TRANSLATIONS.pt;

  const translateText = async (text) => {
    if (!text || text === "N/A") return text;

    try {
      const languageCode = props.language || "pt";
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${languageCode}&dt=t&q=${encodeURIComponent(
          text,
        )}`,
      );

      const data = await response.json();
      return data?.[0]?.map((chunk) => chunk?.[0]).join("") || text;
    } catch (error) {
      console.error("Erro ao traduzir:", error);
      return text;
    }
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!props.apiKey) {
        setErrorMessage("Chave da OMDB não configurada.");
        return;
      }

      setIsLoading(true);
      setErrorMessage("");
      setTranslatedData({});

      try {
        const params = new URLSearchParams({
          apikey: props.apiKey,
          i: props.movieID,
          plot: "full",
        });

        const response = await fetch(`${props.apiUrl}?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Falha ao carregar detalhes do filme.");
        }

        const data = await response.json();

        if (data.Response === "False") {
          throw new Error(data.Error || "Detalhes não encontrados na OMDB.");
        }

        setMovieDesc(data);

        // Traduzir múltiplos campos
        const [title, plot, actors, genre, type] = await Promise.all([
          translateText(data?.Title),
          translateText(data?.Plot),
          translateText(data?.Actors),
          translateText(data?.Genre),
          translateText(data?.Type),
        ]);

        setTranslatedData({
          Title: title,
          Plot: plot,
          Actors: actors,
          Genre: genre,
          Type: type,
        });
      } catch (error) {
        setErrorMessage(error.message || "Erro ao buscar detalhes do filme.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [props.apiKey, props.apiUrl, props.movieID, props.language]);

  return (
    <div className={styles.modalBackdrop} onClick={props.click}>
      <div className={styles.movieModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.movieInfo}>
          <img src={movieDesc.Poster} alt="" />

          <button className={styles.btnClose} onClick={props.click}>
            X
          </button>

          <div className={styles.movieType}>
            <div>
              <img src="/favicon.png" alt="" />
              {translatedData.Type || movieDesc.Type}
              <h1>{translatedData.Title || movieDesc.Title}</h1>
              <a
                href={`https://google.com/search?q=${encodeURIComponent(movieDesc.Title)}`}
                target="_blank"
                rel="noreferrer"
              >
                ▶️ {labels.watch}
              </a>
            </div>
          </div>
        </div>
        <div className={styles.containerMisc}>
          <div className={styles.containerFlex}>
            {labels.rating}: {movieDesc.imdbRating} | {labels.duration}:{" "}
            {movieDesc.Runtime} | {movieDesc.Released}
          </div>
          <div className={styles.containerFlex}>
            <p>
              {labels.cast}: {translatedData.Actors || movieDesc.Actors}
            </p>
            <p>
              {labels.genre}: {translatedData.Genre || movieDesc.Genre}
            </p>
          </div>
        </div>
        <div className={styles.desc}>
          {isLoading ? (
            <p>{labels.loading}</p>
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <p>
              {labels.synopsis}: {translatedData.Plot || movieDesc.Plot}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
