// Service de traduction simple pour les ingrédients culinaires
const ingredientTranslations: Record<string, string> = {
  // Viandes
  'poulet': 'chicken',
  'boeuf': 'beef',
  'porc': 'pork',
  'agneau': 'lamb',
  'dinde': 'turkey',
  'saumon': 'salmon',
  'thon': 'tuna',
  'crevettes': 'shrimp',
  'jambon': 'ham',
  'oeuf': 'egg',
  'oeufs': 'eggs',

  // Légumes
  'tomate': 'tomato',
  'tomates': 'tomatoes',
  'carotte': 'carrot',
  'carottes': 'carrots',
  'brocoli': 'broccoli',
  'brocolis': 'broccoli',
  'épinards': 'spinach',
  'epinards': 'spinach',
  'salade': 'lettuce',
  'concombre': 'cucumber',
  'oignon': 'onion',
  'oignons': 'onions',
  'ail': 'garlic',
  'pomme de terre': 'potato',
  'pommes de terre': 'potatoes',
  'courgette': 'zucchini',
  'courgettes': 'zucchini',
  'aubergine': 'eggplant',
  'poivron': 'bell pepper',
  'poivrons': 'bell peppers',
  'haricots vert': 'green beans',

  // Fruits
  'pomme': 'apple',
  'pommes': 'apples',
  'banane': 'banana',
  'bananes': 'bananas',
  'orange': 'orange',
  'oranges': 'oranges',
  'fraise': 'strawberry',
  'fraises': 'strawberries',
  'raisin': 'grapes',
  'raisins': 'grapes',

  // Céréales et féculents
  'riz': 'rice',
  'pates': 'pasta',
  'pain': 'bread',
  'quinoa': 'quinoa',
  'avoine': 'oats',
  'blé': 'wheat',
  'ble': 'wheat',

  // Produits laitiers
  'lait': 'milk',
  'fromage': 'cheese',
  'yaourt': 'yogurt',
  'beurre': 'butter',
  'crème': 'cream',

  // Légumineuses
  'haricots': 'beans',
  'lentilles': 'lentils',
  'pois chiches': 'chickpeas',

  // Huiles et graisses
  'huile': 'oil',
  "huile d'olive": 'olive oil',

  // Unités de mesure
  'gramme': 'gram',
  'grammes': 'grams',
  'kilogramme': 'kilogram',
  'kilogrammes': 'kilograms',
  'tasse': 'cup',
  'tasses': 'cups',
  'cuillère': 'spoon',
  'cuillères': 'spoons',
  'cuillère à soupe': 'tablespoon',
  'cuillères à soupe': 'tablespoons',
  'cuillère à café': 'teaspoon',
  'cuillères à café': 'teaspoons',

  // Préparations
  'grillé': 'grilled',
  'grillée': 'grilled',
  'grillés': 'grilled',
  'grillées': 'grilled',
  'cuit': 'cooked',
  'cuite': 'cooked',
  'cuits': 'cooked',
  'cuites': 'cooked',
  'cru': 'raw',
  'crue': 'raw',
  'crus': 'raw',
  'crues': 'raw',
  'bouilli': 'boiled',
  'bouillie': 'boiled',
  'bouillis': 'boiled',
  'bouillies': 'boiled',
  'frit': 'fried',
  'frite': 'fried',
  'frits': 'fried',
  'frites': 'fried',
};

export const translateIngredient = (frenchText: string): string => {
  let translatedText = frenchText.toLowerCase();

  // Remplacer les mots français par leurs équivalents anglais
  Object.entries(ingredientTranslations).forEach(([french, english]) => {
    const regex = new RegExp(`\\b${french}\\b`, 'gi');
    translatedText = translatedText.replace(regex, english);
  });

  // Remplacer les abréviations communes
  translatedText = translatedText
      .replace(/\bg\b/g, 'g') // grammes
      .replace(/\bkg\b/g, 'kg') // kilogrammes
      .replace(/\bml\b/g, 'ml') // millilitres
      .replace(/\bl\b/g, 'l'); // litres

  return translatedText;
};

export const translateIngredients = (ingredients: string[]): string[] => {
  return ingredients.map(ingredient => translateIngredient(ingredient));
};