import React, { useState, useEffect, useCallback } from 'react';
import { fetchKarakalpakWords, WordCategory } from './services/geminiService';
import { HangmanDrawing } from './components/HangmanDrawing';
import { WordDisplay } from './components/WordDisplay';
import { Keyboard } from './components/Keyboard';
import { CategorySelector } from './components/CategorySelector';

type GameStatus = "loading" | "choosing_category" | "playing" | "won" | "lost" | "error";

function App() {
  const [categories, setCategories] = useState<WordCategory[]>([]);
  const [wordToGuess, setWordToGuess] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("loading");
  
  const incorrectGuesses = guessedLetters.filter(
    letter => !wordToGuess.toUpperCase().includes(letter)
  );

  const MAX_MISTAKES = 6;
  const isLoser = incorrectGuesses.length >= MAX_MISTAKES;
  
  const isWinner = wordToGuess && wordToGuess
    .toUpperCase()
    .split("")
    .every(letter => guessedLetters.includes(letter) || letter === ' ');

  const loadWords = useCallback(async () => {
    try {
      setGameStatus("loading");
      const fetchedCategories = await fetchKarakalpakWords();
      if (fetchedCategories && fetchedCategories.length > 0) {
        setCategories(fetchedCategories);
        setGameStatus("choosing_category");
      } else {
        setGameStatus("error");
      }
    } catch (error) {
      console.error("Failed to fetch words:", error);
      setGameStatus("error");
    }
  }, []);

  useEffect(() => {
    loadWords();
  }, [loadWords]);

  const handleSelectCategory = useCallback((selectedCategory: WordCategory) => {
    if (selectedCategory && selectedCategory.words.length > 0) {
        const newWord = selectedCategory.words[Math.floor(Math.random() * selectedCategory.words.length)];
        setWordToGuess(newWord.toUpperCase());
        setCategory(selectedCategory.category);
        setGuessedLetters([]);
        setGameStatus("playing");
    }
  }, []);

  const handlePlayAgain = useCallback(() => {
    setWordToGuess("");
    setCategory("");
    setGuessedLetters([]);
    setGameStatus("choosing_category");
  }, []);

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isWinner || isLoser) return;
    setGuessedLetters(currentLetters => [...currentLetters, letter]);
  }, [guessedLetters, isWinner, isLoser]);

  useEffect(() => {
    if (gameStatus !== 'playing') return;
    if (isWinner) {
      setGameStatus("won");
    } else if (isLoser) {
      setGameStatus("lost");
    }
  }, [guessedLetters, isWinner, isLoser, gameStatus]);


  const renderGameContent = () => {
    switch (gameStatus) {
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center text-2xl font-semibold text-sky-600">
            <svg className="animate-spin h-10 w-10 text-sky-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4">Karakalpak sózlerin alıp atırmız...</p>
            <p className="text-sm text-slate-500 mt-2">(Loading Karakalpak words...)</p>
          </div>
        );
      case 'error':
        return (
            <div className="text-center p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p className="font-bold text-xl">Qáte júz berdi!</p>
                <p>Sózlerdi alıw múmkin bolmadı. Keshirek qayta urınıp kóriń.</p>
                <p className="text-sm mt-2">(Error! Could not load words. Please try again later.)</p>
                <button
                    onClick={loadWords}
                    className="mt-4 px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75"
                >
                    Qaytadan urınıp kóriń
                </button>
            </div>
        );
      case 'choosing_category':
        return (
          <CategorySelector 
            categories={categories}
            onSelectCategory={handleSelectCategory}
            disabled={gameStatus !== 'choosing_category'}
          />
        );
      default:
        return (
          <>
            <div className="relative mb-4">
              <HangmanDrawing numberOfGuesses={incorrectGuesses.length} />
              {(gameStatus === 'won' || gameStatus === 'lost') && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
                    <div className={`text-4xl font-bold ${gameStatus === 'won' ? 'text-green-600' : 'text-red-600'}`}>
                        {gameStatus === 'won' ? 'Siz Uttıńız! 🎉' : 'Siz Utıldıńız!'}
                    </div>
                    <button
                        onClick={handlePlayAgain}
                        className="mt-6 px-6 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
                    >
                        Qaytadan Oynaw
                    </button>
                </div>
              )}
            </div>
            {gameStatus === 'playing' && (
              <p className="text-xl text-slate-600 mb-4">
                  Kategoriya: <span className="font-semibold text-sky-700">{category}</span>
              </p>
            )}
            <WordDisplay wordToGuess={wordToGuess} guessedLetters={guessedLetters} reveal={gameStatus === 'lost'} />
            <div className="mt-8 self-stretch">
              <Keyboard
                activeLetters={guessedLetters.filter(letter => wordToGuess.toUpperCase().includes(letter))}
                inactiveLetters={incorrectGuesses}
                onGuess={addGuessedLetter}
                disabled={gameStatus !== 'playing'}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto p-4 sm:p-8 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-sky-800 tracking-wider">Qaraqalpaqsha Hangman</h1>
      </header>
      {renderGameContent()}
    </div>
  );
}

export default App;