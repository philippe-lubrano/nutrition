export interface NutrientInfo {
  label: string;
  quantity: number;
  unit: string;
}

export interface NutritionData {
  calories: number;
  totalWeight: number;
  dietLabels: string[];
  healthLabels: string[];
  totalNutrients: {
    ENERC_KCAL: NutrientInfo;
    FAT: NutrientInfo;
    FASAT: NutrientInfo;
    CHOCDF: NutrientInfo;
    SUGAR: NutrientInfo;
    PROCNT: NutrientInfo;
    FIBTG: NutrientInfo;
    NA: NutrientInfo;
  };
}

export interface EdamamResponse {
  calories: number;
  totalWeight: number;
  dietLabels: string[];
  healthLabels: string[];
  totalNutrients?: Record<string, NutrientInfo>;
}

export interface Ingredient {
  id: string;
  text: string;
}