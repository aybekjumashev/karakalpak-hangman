
import React from 'react';
import { KARAKALPAK_ALPHABET } from '../constants';

interface KeyboardProps {
  activeLetters: string[];
  inactiveLetters: string[];
  onGuess: (letter: string) => void;
  disabled?: boolean;
}

export const Keyboard: React.FC<KeyboardProps> = ({
  activeLetters,
  inactiveLetters,
  onGuess,
  disabled = false,
}) => {
  return (
    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-11 gap-2">
      {KARAKALPAK_ALPHABET.map(key => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        return (
          <button
            onClick={() => onGuess(key)}
            key={key}
            className={`
              h-14 sm:h-16 text-xl sm:text-2xl font-bold rounded-lg flex items-center justify-center
              border-b-4 transition-all duration-150
              ${
                isActive
                  ? 'bg-sky-500 text-white border-sky-700'
                  : isInactive
                  ? 'bg-slate-300 text-slate-500 opacity-60'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-sky-100'
              }
              focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            disabled={isActive || isInactive || disabled}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};
