import React from 'react';
import { WordCategory } from '../services/geminiService';

interface CategorySelectorProps {
  categories: WordCategory[];
  onSelectCategory: (category: WordCategory) => void;
  disabled: boolean;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, onSelectCategory, disabled }) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <p className="text-slate-500 mb-8">Oyındı baslaw ushın kategoriyanı saylań</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {categories.map(category => (
          <button
            key={category.category}
            onClick={() => onSelectCategory(category)}
            disabled={disabled}
            className="p-6 bg-white rounded-lg shadow-md text-sky-700 font-bold text-xl text-center border-b-4 border-slate-300 hover:bg-sky-100 hover:border-sky-500 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {category.category}
          </button>
        ))}
      </div>
    </div>
  );
};
