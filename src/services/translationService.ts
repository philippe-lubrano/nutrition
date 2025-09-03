// Service de traduction utilisant LibreTranslate API (gratuite)
const LIBRE_TRANSLATE_URL = 'https://libretranslate.de/translate';

export const translateToEnglish = async (text: string): Promise<string> => {
  try {
    const response = await fetch(LIBRE_TRANSLATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: 'fr',
        target: 'en',
        format: 'text'
      })
    });

    if (!response.ok) {
      throw new Error('Erreur de traduction');
    }

    const data = await response.json();
    return data.translatedText;
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