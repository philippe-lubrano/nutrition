import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface IngredientFormProps {
  onAddIngredient: (ingredient: string) => void;
  loading: boolean;
}

const IngredientForm: React.FC<IngredientFormProps> = ({ onAddIngredient, loading }) => {
  const [ingredient, setIngredient] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredient.trim()) {
      onAddIngredient(ingredient.trim());
      setIngredient('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="flex-1">
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Ex: 200g de poulet grillé, 1 tasse de riz..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={loading || !ingredient.trim()}
        className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Ajouter
      </button>
    </form>
  );
};

export default IngredientForm;