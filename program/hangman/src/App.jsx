import { useState, useEffect } from "react";

// Lista słów do gry
const words = [
  "kod",
  "html",
  "css",
  "java",
  "algorytm",
  "procesor",
  "funkcja",
  "zmienna",
  "tablica",
  "parametr",
  "serwer",
  "biblioteka",
];

// Funkcja losująca słowo z listy
const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

const Hangman = () => {
  const [word, setWord] = useState(getRandomWord());
  const [guesses, setGuesses] = useState([]);
  const [wrongGuessses, setWrongGuesses] = useState(0);

  // Funkcja obsługująca odgadnięcie litery
  const handleGuess = (letter) => {
    if (guesses.includes(letter)) return;
    setGuesses([...guesses, letter]);
    if (!word.includes(letter)) {
      setWrongGuesses(wrongGuessses + 1);
    }
  };

  const renderWord = () => {
    return word.split("").map((letter, index) => {
      return (
        <span key={index} className="letter">
          {guesses.includes(letter) ? letter : "_"}
        </span>
      );
    });
  };

  const renderAlphabet = () => {
    const alphabet = "qwertyuiopasdfghjklzxcvbnm".split("");
    return alphabet.map((letter) => {
      return (
        <button
          key={letter}
          onClick={() => handleGuess(letter)}
          disabled={guesses.includes(letter)}
          className="alphabet-button"
          onKeyDown={(e) => {
            if (e.key === letter) {
              handleGuess(letter);
            }
          }}
          tabIndex={0}
        >
          {letter.toUpperCase()}
        </button>
      );
    });
  };

  const handleKeyPress = (e) => {
    const letter = e.key.toLowerCase();
    if (letter >= "a" && letter <= "z") {
      handleGuess(letter);
    } else if (e.key === " ") {
      resetGame();
    }
  };

  const resetGame = () => {
    setWord(getRandomWord());
    setGuesses([]);
    setWrongGuesses(0);
  };

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  });

  const hasWon = word.split("").every((letter) => guesses.includes(letter));
  const hasLost = wrongGuessses >= 6;

  const WinScreen = () => {
    return (
      <div className="hangman-game">
        <h2>Wygrałeś!!!</h2>
        <p>Słowo: {word}</p>
        <button onClick={() => resetGame()}>Zagraj ponownie</button>
      </div>
    );
  };

  const LoseScreen = () => {
    return (
      <div className="hangman-game">
        <h2>Przegrałeś :(</h2>
        <p>Słowo: {word}</p>
        <button onClick={() => resetGame()}>Zagraj ponownie</button>
      </div>
    );
  };

  const renderHangman = () => {
    const stages = [
      `
     -----
     |   |
         |
         |
         |
         |
    =========`,
      `
     -----
     |   |
     O   |
         |
         |
         |
    =========`,
      `
     -----
     |   |
     O   |
     |   |
         |
         |
    =========`,
      `
     -----
     |   |
     O   |
    /|   |
         |
         |
    =========`,
      `
     -----
     |   |
     O   |
    /|\\  |
         |
         |
    =========`,
      `
     -----
     |   |
     O   |
    /|\\  |
    /    |
         |
    =========`,
      `
     -----
     |   |
     O   |
    /|\\  |
    / \\  |
         |
    =========`,
    ];
    return <pre>{stages[wrongGuessses]}</pre>;
  };

  return (
    <div className="hangman-game">
      <h1 className="title">Wisielec</h1>
      {hasWon ? (
        <WinScreen />
      ) : hasLost ? (
        <LoseScreen />
      ) : (
        <>
          <div className="word">{renderWord()}</div>
          <div className="hangman">{renderHangman()}</div>
          <div className="alphabet">{renderAlphabet()}</div>
        </>
      )}
    </div>
  );
};
export default function App() {
  return <Hangman />;
}
