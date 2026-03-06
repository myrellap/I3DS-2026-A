import { useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";

const MovieDescription = (props) => {
  const [movieDesc, setMovieDesc] = useState([]);
  const [translatedPlot, setTranslatedPlot] = useState("");

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
      try {
        const response = await fetch(`${props.apiUrl}&i=${props.movieID}`);
        const data = await response.json();

        setMovieDesc(data);

        const plotInPortuguese = await translateToPortuguese(data?.Plot);
        setTranslatedPlot(plotInPortuguese);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [props.apiUrl, props.movieID]);

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
          <p>Sinopse: {translatedPlot || movieDesc.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
