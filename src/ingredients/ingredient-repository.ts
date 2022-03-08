export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

export class IngredientRepository {
  private _ingredients: { recipeId: string; ingredient: Ingredient }[] = [];

  addIngredient({
    recipeId,
    ingredient,
  }: {
    recipeId: string;
    ingredient: Ingredient;
  }) {
    this._ingredients = [
      ...this._ingredients,
      {
        recipeId,
        ingredient,
      },
    ];
  }

  getRecipeIngredients(recipeId: string) {
    return this._ingredients
      .filter(({ recipeId: _recipeId }) => _recipeId === recipeId)
      .map(({ ingredient }) => ingredient);
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
