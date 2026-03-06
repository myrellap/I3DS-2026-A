import { useEffect, useState } from "react";
import styles from "./MovieCard.module.css";
import MovieDescription from "../MovieDescription/MovieDescription";

const MovieCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [translatedTitle, setTranslatedTitle] = useState("");

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
    const translateTitle = async () => {
      const translated = await translateText(props.Title);
      setTranslatedTitle(translated);
    };

    translateTitle();
  }, [props.Title, props.language]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className={styles.movie} onClick={toggleModal}>
        <div>
          <p>{props.Year}</p>
        </div>

        <div>
          <img
            src={
              props.Poster !== "N/A"
                ? props.Poster
                : "https://via.placeholder.com/300x450/ba69e9/ffffff?text=No+Image"
            }
            alt={props.Title}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x450/ba69e9/ffffff?text=Image+Error";
            }}
          />
        </div>

        <div>
          <span>{props.Type}</span>
          <h3>{translatedTitle || props.Title}</h3>
        </div>
      </div>

      {isModalOpen && (
        <MovieDescription
          apiUrl={props.apiUrl}
          apiKey={props.apiKey}
          movieID={props.imdbID}
          click={toggleModal}
          language={props.language}
        />
      )}
    </>
  );
};

export default MovieCard;
