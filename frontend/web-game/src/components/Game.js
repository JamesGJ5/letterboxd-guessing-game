import "../styles/Game.css";
import { useState, useEffect } from "react";
import getFilmPair from "../functions/getFilmPair";
import HighScore from "./HighScore";
import CurrentScore from "./CurrentScore";
import FilmHidingRating from "./FilmHidingRating";
import FilmShowingRating from "./FilmShowingRating";

function Game() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [filmObjectArray, setFilmObjectArray] = useState([]);

  useEffect(() => changeFilms, []);
  useEffect(() => {
    setHighScore((highScore) => (currentScore > highScore) ? currentScore : highScore);
  }, [currentScore]);

  const changeFilms = async () => {
    const newFilmObjectArray = await getFilmPair();
    setFilmObjectArray(newFilmObjectArray);
  };
  const selectFilmHidingRating = () => {
    processFilmSelection(0);
  };
  const selectFilmShowingRating = () => {
    processFilmSelection(1);
  };
  const processFilmSelection = (selectedFilmObjectIndex) => {
    const selectedFilmObject = filmObjectArray[selectedFilmObjectIndex];
    const opponentFilmObject = filmObjectArray[1 - selectedFilmObjectIndex];
    updateScore(selectedFilmObject, opponentFilmObject);
    changeFilms();
  };
  const updateScore = (selectedFilmObject, opponentFilmObject) => {
    if (
      selectedFilmObject.averageRatingString >
      opponentFilmObject.averageRatingString
    ) {
      setCurrentScore((currentScore) => currentScore + 1);
    } else {
      setCurrentScore(0);
    }
  };

  return (
    <div className="Game">
      <header aria-label="Instruction and scores">
        <h1 id="instruction">Click the Film with the Higher Letterboxd Rating...</h1>
        <div aria-label="Scores">
          <CurrentScore score={currentScore} />
          <HighScore score={highScore} />
        </div>
      </header>
      {filmObjectArray.length === 2 && (
        <main aria-labelledby="instruction">
          <FilmHidingRating
            filmObject={filmObjectArray[0]}
            onFilmClick={selectFilmHidingRating}
          />
          <FilmShowingRating
            filmObject={filmObjectArray[1]}
            onFilmClick={selectFilmShowingRating}
          />
        </main>
      )}
    </div>
  );
}

export default Game;