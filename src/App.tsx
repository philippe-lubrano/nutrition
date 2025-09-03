import React, { useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';
import IngredientForm from './components/IngredientForm';
import IngredientList from './components/IngredientList';
import NutritionDisplay from './components/NutritionDisplay';
import { analyzeNutrition } from './services/nutritionApi';
import type { Ingredient, EdamamResponse } from './types/nutrition';

function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [nutritionData, setNutritionData] = useState<EdamamResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addIngredient = (text: string) => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      text,
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
  };

  const calculateNutrition = async () => {
    if (ingredients.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const ingredientTexts = ingredients.map(ing => ing.text);
      const data = await analyzeNutrition(ingredientTexts);
      setNutritionData(data);
    } catch (err) {
      setError('Erreur lors du calcul nutritionnel. Veuillez réessayer.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setIngredients([]);
    setNutritionData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Calculateur de Macronutriments
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analysez facilement les valeurs nutritionnelles de vos repas. 
            Ajoutez vos ingrédients et obtenez un aperçu complet des macronutriments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Colonne gauche - Formulaire et liste */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Ajouter un ingrédient</h2>
              <IngredientForm onAddIngredient={addIngredient} loading={loading} />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <IngredientList ingredients={ingredients} onRemoveIngredient={removeIngredient} />
              
              {ingredients.length > 0 && (
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={calculateNutrition}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Calcul en cours...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-5 h-5" />
                        Calculer
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={resetAll}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-800">{error}</p>
              </div>
            )}
          </div>

          {/* Colonne droite - Résultats nutritionnels */}
          <div>
            <NutritionDisplay nutritionData={nutritionData} loading={loading} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Données nutritionnelles fournies par l'API Edamam</p>
        </div>
      </div>
    </div>
  );
}

export default App;