// Service de traduction utilisant LibreTranslate API (gratuite)
const LIBRE_TRANSLATE_URL = 'https://655.mtis.workers.dev/translate';

export const translateToEnglish = async (text: string): Promise<string> => {
  try {
    const url = LIBRE_TRANSLATE_URL + `?source_lang=fr&target_lang=en&text=${text}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erreur de traduction');
    }

    const data = await response.json();
    return data.translated_text;
  } catch (error) {
    console.error('Erreur lors de la traduction:', error);
    // Fallback: retourner le texte original si la traduction échoue
    return text;
  }
};

export const translateIngredients = async (ingredients: string[]): Promise<string[]> => {
  try {
    // Traduire tous les ingrédients en parallèle
    const translationPromises = ingredients.map(ingredient => translateToEnglish(ingredient));
    const translatedIngredients = await Promise.all(translationPromises);
    
    console.log('Ingrédients traduits:', translatedIngredients);
    return translatedIngredients;
  } catch (error) {
    console.error('Erreur lors de la traduction des ingrédients:', error);
    // Fallback: retourner les ingrédients originaux
    return ingredients;
  }
};