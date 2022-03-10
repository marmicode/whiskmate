import { nanoid } from 'nanoid';

export interface IngredientData {
  name: string;
  quantity: number;
  unit: string;
}

export interface Ingredient extends IngredientData {
  id: string;
}

export class IngredientRepository {
  private _ingredients: { recipeId: string; ingredient: Ingredient }[] = [];

  addIngredient({
    recipeId,
    ingredientData,
  }: {
    recipeId: string;
    ingredientData: IngredientData;
  }) {
    const ingredient = {
      ...ingredientData,
      id: nanoid(),
    };

    this._ingredients = [
      ...this._ingredients,
      {
        recipeId,
        ingredient,
      },
    ];

    return ingredient;
  }

  getRecipeIngredients(recipeId: string) {
    return this._ingredients
      .filter(({ recipeId: _recipeId }) => _recipeId === recipeId)
      .map(({ ingredient }) => ingredient);
  }

  getIngredientRecipeId(ingredientId: string) {
    return this._ingredients.find(
      ({ ingredient }) => ingredient.id === ingredientId
    )?.recipeId;
  }

  updateIngredient({
    ingredientId,
    changes,
  }: {
    ingredientId: string;
    changes: Partial<Ingredient>;
  }) {
    this._ingredients = this._ingredients.map(({ recipeId, ingredient }) => {
      if (ingredient.id === ingredientId) {
        ingredient = {
          ...ingredient,
          ...changes,
        };
      }

      return { recipeId, ingredient };
    });
  }
}
