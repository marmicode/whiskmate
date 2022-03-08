import { IngredientRepository } from './ingredient-repository';

describe(IngredientRepository.name, () => {
  let repository: IngredientRepository;
  beforeEach(() => (repository = new IngredientRepository()));

  it('should add ingredient', () => {
    repository.addIngredient({
      recipeId: 'burger',
      ingredient: {
        id: 'cheese',
        name: 'Cheese',
        unit: 'g',
        quantity: 50,
      },
    });

    repository.addIngredient({
      recipeId: 'burger',
      ingredient: {
        id: 'meat',
        name: 'Meat',
        unit: 'g',
        quantity: 200,
      },
    });

    repository.addIngredient({
      recipeId: 'salad',
      ingredient: {
        id: 'tomatoes',
        name: 'Tomatoes',
        unit: 'g',
        quantity: 200,
      },
    });

    const ingredients = repository.getRecipeIngredients('burger');
    expect(ingredients).toEqual([
      {
        id: 'cheese',
        name: 'Cheese',
        unit: 'g',
        quantity: 50,
      },
      {
        id: 'meat',
        name: 'Meat',
        unit: 'g',
        quantity: 200,
      },
    ]);
  });

  it('should update ingredient', () => {
    repository.addIngredient({
      recipeId: 'burger',
      ingredient: {
        id: 'cheese',
        name: 'Cheese',
        unit: 'g',
        quantity: 50,
      },
    });

    repository.updateIngredient({
      ingredientId: 'cheese',
      data: {
        quantity: 60,
      },
    });

    const ingredients = repository.getRecipeIngredients('burger');
    expect(ingredients).toEqual([
      {
        id: 'cheese',
        name: 'Cheese',
        unit: 'g',
        quantity: 60,
      },
    ]);
  });
});
