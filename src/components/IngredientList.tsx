import React from 'react';
import { Trash2, Package } from 'lucide-react';
import type { Ingredient } from '../types/nutrition';

interface IngredientListProps {
  ingredients: Ingredient[];
  onRemoveIngredient: (id: string) => void;
}

const IngredientList: React.FC<IngredientListProps> = ({ ingredients, onRemoveIngredient }) => {
  if (ingredients.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p className="text-lg">Aucun ingrédient ajouté</p>
        <p className="text-sm">Commencez par ajouter des ingrédients à votre repas</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-800 text-lg">Ingrédients ({ingredients.length})</h3>
      <div className="space-y-2">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <span className="text-gray-700">{ingredient.text}</span>
            <button
              onClick={() => onRemoveIngredient(ingredient.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Supprimer l'ingrédient"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientList;