
import React from 'react';

const HEAD = (
  <circle cx="210" cy="90" r="30" stroke="currentColor" strokeWidth="8" fill="none" key="head" />
);

const BODY = (
  <line x1="210" y1="120" x2="210" y2="200" stroke="currentColor" strokeWidth="8" key="body" />
);

const RIGHT_ARM = (
  <line x1="210" y1="150" x2="160" y2="120" stroke="currentColor" strokeWidth="8" key="right-arm" />
);

const LEFT_ARM = (
  <line x1="210" y1="150" x2="260" y2="120" stroke="currentColor" strokeWidth="8" key="left-arm" />
);

const RIGHT_LEG = (
  <line x1="210" y1="200" x2="160" y2="250" stroke="currentColor" strokeWidth="8" key="right-leg" />
);

const LEFT_LEG = (
  <line x1="210" y1="200" x2="260" y2="250" stroke="currentColor" strokeWidth="8" key="left-leg" />
);

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

interface HangmanDrawingProps {
  numberOfGuesses: number;
}

export const HangmanDrawing: React.FC<HangmanDrawingProps> = ({ numberOfGuesses }) => {
  return (
    <div style={{ position: 'relative', width: '280px', height: '350px' }}>
      <svg viewBox="0 0 300 350" className="w-full h-full text-slate-800">
        {BODY_PARTS.slice(0, numberOfGuesses)}
        {/* Gallows */}
        <line x1="20" y1="330" x2="150" y2="330" stroke="currentColor" strokeWidth="10" />
        <line x1="85" y1="330" x2="85" y2="20" stroke="currentColor" strokeWidth="10" />
        <line x1="80" y1="20" x2="210" y2="20" stroke="currentColor" strokeWidth="10" />
        <line x1="210" y1="20" x2="210" y2="60" stroke="currentColor" strokeWidth="10" />
      </svg>
    </div>
  );
};
