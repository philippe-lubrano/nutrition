import React from 'react';
import { Flame, Zap, Wheat, Beef, Droplet } from 'lucide-react';
import type { EdamamResponse } from '../types/nutrition';

interface NutritionDisplayProps {
  nutritionData: EdamamResponse | null;
  loading: boolean;
}

const NutritionDisplay: React.FC<NutritionDisplayProps> = ({ nutritionData, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!nutritionData) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Informations nutritionnelles</h3>
        <p className="text-gray-500 text-center py-8">
          Ajoutez des ingrédients pour voir l'analyse nutritionnelle
        </p>
      </div>
    );
  }

  const macros = [
    {
      name: 'Calories',
      value: Math.round(nutritionData.calories),
      unit: 'kcal',
      icon: Flame,
      color: 'text-red-600 bg-red-50',
    },
    {
      name: 'Protéines',
      value: Math.round(nutritionData.totalNutrients?.PROCNT?.quantity || 0),
      unit: 'g',
      icon: Beef,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      name: 'Glucides',
      value: Math.round(nutritionData.totalNutrients?.CHOCDF?.quantity || 0),
      unit: 'g',
      icon: Wheat,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      name: 'Lipides',
      value: Math.round(nutritionData.totalNutrients?.FAT?.quantity || 0),
      unit: 'g',
      icon: Droplet,
      color: 'text-emerald-600 bg-emerald-50',
    },
  ];

  const detailedNutrients = [
    {
      name: 'Fibres',
      value: nutritionData.totalNutrients?.FIBTG?.quantity || 0,
      unit: 'g'
    },
    {
      name: 'Sucres',
      value: nutritionData.totalNutrients?.SUGAR?.quantity || 0,
      unit: 'g'
    },
    {
      name: 'Graisses saturées',
      value: nutritionData.totalNutrients?.FASAT?.quantity || 0,
      unit: 'g'
    },
    {
      name: 'Sodium',
      value: nutritionData.totalNutrients?.NA?.quantity || 0,
      unit: 'mg'
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Informations nutritionnelles</h3>
      
      {/* Macronutriments principaux */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {macros.map((macro) => {
          const Icon = macro.icon;
          return (
            <div key={macro.name} className="text-center p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${macro.color} mb-3`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {macro.value}
                <span className="text-sm font-normal text-gray-500 ml-1">{macro.unit}</span>
              </div>
              <div className="text-sm text-gray-600">{macro.name}</div>
            </div>
          );
        })}
      </div>

      {/* Informations détaillées */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Détails nutritionnels
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {detailedNutrients.map((nutrient) => (
            <div key={nutrient.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">{nutrient.name}</span>
              <span className="font-medium text-gray-800">
                {Math.round(nutrient.value * 100) / 100} {nutrient.unit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Poids total */}
      <div className="mt-6 text-center text-sm text-gray-500">
        Poids total estimé: {Math.round(nutritionData.totalWeight)} g
      </div>
    </div>
  );
};

export default NutritionDisplay;