import React from 'react';
import { Flame, Zap, Wheat, Beef, Droplet } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
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

  // Préparation des données pour le camembert
  const pieData = [
    {
      name: 'Protéines',
      value: Math.round(nutritionData.totalNutrients?.PROCNT?.quantity || 0),
      color: '#2563eb', // bleu
    },
    {
      name: 'Glucides',
      value: Math.round(nutritionData.totalNutrients?.CHOCDF?.quantity || 0),
      color: '#d97706', // amber
    },
    {
      name: 'Lipides',
      value: Math.round(nutritionData.totalNutrients?.FAT?.quantity || 0),
      color: '#059669', // émeraude
    },
  ];

  // Palette pastel améliorée et plus contrastée
  const pastelColors = ['#7FB3FF', '#FFD6A5', '#B5EAD7'];

  // Total macronutriments
  const totalMacros = pieData.reduce((sum, d) => sum + d.value, 0);

  const renderCustomLabel = (props) => {
    const { cx, cy, midAngle = 0, outerRadius, percent, index } = props;
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 24;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const entry = pieData[index];
    // Ligne de liaison
    const lineX = cx + (outerRadius + 8) * Math.cos(-midAngle * RADIAN);
    const lineY = cy + (outerRadius + 8) * Math.sin(-midAngle * RADIAN);
    return (
        <g>
          <polyline
              points={`${lineX},${lineY} ${x},${y}`}
              stroke="#bbb"
              strokeWidth={1.5}
              fill="none"
          />
          <circle cx={x} cy={y} r={18} fill="#fff" filter="url(#shadow)" />
          <text x={x} y={y} fill="#333" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="14" fontWeight="bold">
            {entry.name}
          </text>
          <text x={x} y={y + 16} fill="#666" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12">
            {entry.value}g • {(percent * 100).toFixed(0)}%
          </text>
        </g>
    );
  };

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

      {/* Camembert des macronutriments */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Répartition des macronutriments</h4>
        <div className="flex justify-center">
          <div>
            <ResponsiveContainer width={340} height={270}>
              <PieChart>
                <defs>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#bbb" floodOpacity="0.25" />
                  </filter>
                </defs>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={56}
                  labelLine={false}
                  label={renderCustomLabel}
                  isAnimationActive={true}
                  animationDuration={1000}
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pastelColors[index % pastelColors.length]} />
                  ))}
                </Pie>
                {/* Affichage du total au centre */}
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="24" fontWeight="bold" fill="#222">
                  {totalMacros}g
                </text>
                <text x="50%" y="62%" textAnchor="middle" dominantBaseline="middle" fontSize="13" fill="#888">
                  Total
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionDisplay;