import { translateIngredients } from './translationService';

const EDAMAM_APP_ID = 'your_app_id_here';
const EDAMAM_APP_KEY = 'your_app_key_here';

export const analyzeNutrition = async (ingredients: string[]): Promise<any> => {
  if (!EDAMAM_APP_ID || EDAMAM_APP_ID === 'your_app_id_here') {
    // Données simulées pour la démo
    return simulateNutritionData(ingredients);
  }

  // Traduire les ingrédients en anglais avant d'appeler l'API
  const translatedIngredients = await translateIngredients(ingredients);
  
  const url = `https://api.edamam.com/api/nutrition-details?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`;
  
  const requestBody = {
    ingr: translatedIngredients
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'analyse nutritionnelle');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur API Edamam:', error);
    throw error;
  }
};

// Fonction de simulation pour la démo
const simulateNutritionData = (ingredients: string[]) => {
  const baseCaloriesPerIngredient = 150;
  const totalIngredients = ingredients.length;
  
  return {
    calories: baseCaloriesPerIngredient * totalIngredients + Math.random() * 100,
    totalWeight: 200 * totalIngredients,
    dietLabels: ['Low-Carb', 'Low-Fat'],
    healthLabels: ['Sugar-Conscious', 'Keto-Friendly'],
    totalNutrients: {
      ENERC_KCAL: {
        label: 'Energy',
        quantity: baseCaloriesPerIngredient * totalIngredients + Math.random() * 100,
        unit: 'kcal'
      },
      FAT: {
        label: 'Fat',
        quantity: 8 * totalIngredients + Math.random() * 5,
        unit: 'g'
      },
      FASAT: {
        label: 'Saturated',
        quantity: 2 * totalIngredients + Math.random() * 2,
        unit: 'g'
      },
      CHOCDF: {
        label: 'Carbs',
        quantity: 15 * totalIngredients + Math.random() * 10,
        unit: 'g'
      },
      SUGAR: {
        label: 'Sugars',
        quantity: 5 * totalIngredients + Math.random() * 3,
        unit: 'g'
      },
      PROCNT: {
        label: 'Protein',
        quantity: 12 * totalIngredients + Math.random() * 8,
        unit: 'g'
      },
      FIBTG: {
        label: 'Fiber',
        quantity: 3 * totalIngredients + Math.random() * 2,
        unit: 'g'
      },
      NA: {
        label: 'Sodium',
        quantity: 300 * totalIngredients + Math.random() * 200,
        unit: 'mg'
      }
    }
  };
};