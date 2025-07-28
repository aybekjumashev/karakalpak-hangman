import React from 'react';

interface WordDisplayProps {
  wordToGuess: string;
  guessedLetters: string[];
  reveal?: boolean;
}

export const WordDisplay: React.FC<WordDisplayProps> = ({ wordToGuess, guessedLetters, reveal = false }) => {
  return (
    <div className="flex gap-2 sm:gap-4 justify-center text-3xl sm:text-5xl font-bold tracking-widest flex-wrap">
      {wordToGuess.split('').map((letter, index) => {
        if (letter === ' ') {
            return <div key={index} className="w-4 sm:w-8"></div>;
        }
        return (
          <span
            key={index}
            className="flex items-center justify-center w-10 h-14 sm:w-14 sm:h-20 border-b-4 sm:border-b-8 border-slate-400 pb-2"
          >
            <span
              className={`
                transition-opacity duration-300
                ${(guessedLetters.includes(letter.toUpperCase()) || reveal) ? 'opacity-100' : 'opacity-0'}
                ${reveal && !guessedLetters.includes(letter.toUpperCase()) ? 'text-red-500' : 'text-slate-800'}
              `}
            >
              {letter}
            </span>
          </span>
        );
      })}
    </div>
  );
};