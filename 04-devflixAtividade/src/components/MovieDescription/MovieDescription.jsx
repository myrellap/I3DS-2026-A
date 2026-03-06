import { useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";

const MovieDescription = (props) => {
  const [movieDesc, setMovieDesc] = useState([]);
  const [translatedPlot, setTranslatedPlot] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const translateToPortuguese = async (text) => {
    if (!text || text === "N/A") return text;

    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&dt=t&q=${encodeURIComponent(
          text,
        )}`,
      );

      const data = await response.json();
      return data?.[0]?.map((chunk) => chunk?.[0]).join("") || text;
    } catch (error) {
      console.error("Erro ao traduzir sinopse:", error);
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
      setTranslatedPlot("");

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

        const plotInPortuguese = await translateToPortuguese(data?.Plot);
        setTranslatedPlot(plotInPortuguese);
      } catch (error) {
        setErrorMessage(error.message || "Erro ao buscar detalhes do filme.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [props.apiKey, props.apiUrl, props.movieID]);

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
              {movieDesc.Type}
              <h1>{movieDesc.Title}</h1>
              <a
                href={`https://google.com/search?q=${encodeURIComponent(movieDesc.Title)}`}
                target="_blank"
                rel="noreferrer"
              >
                ▶️ Assistir
              </a>
            </div>
          </div>
        </div>
        <div className={styles.containerMisc}>
          <div className={styles.containerFlex}>
            Avaliação: {movieDesc.imdbRating} | Duração: {movieDesc.Runtime} |{" "}
            {movieDesc.Released}
          </div>
          <div className={styles.containerFlex}>
            <p>Elenco: {movieDesc.Actors}</p>
            <p>Gênero: {movieDesc.Genre}</p>
          </div>
        </div>
        <div className={styles.desc}>
          {isLoading ? (
            <p>Carregando detalhes...</p>
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <p>Sinopse: {translatedPlot || movieDesc.Plot}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
