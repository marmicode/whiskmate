import { IngredientRepository } from './ingredient-repository';

describe(IngredientRepository.name, () => {
  let repository: IngredientRepository;
  beforeEach(() => (repository = new IngredientRepository()));

  it('should add ingredient', () => {
    repository.addIngredient({
      recipeId: 'burger',
      ingredientData: {
        name: 'Cheese',
        unit: 'g',
        quantity: 50,
      },
    });

    repository.addIngredient({
      recipeId: 'burger',
      ingredientData: {
        name: 'Meat',
        unit: 'g',
        quantity: 200,
      },
    });

    repository.addIngredient({
      recipeId: 'salad',
      ingredientData: {
        name: 'Tomatoes',
        unit: 'g',
        quantity: 200,
      },
    });

    const ingredients = repository.getRecipeIngredients('burger');
    expect(ingredients).toEqual([
      {
        id: expect.any(String),
        name: 'Cheese',
        unit: 'g',
        quantity: 50,
      },
      {
        id: expect.any(String),
        name: 'Meat',
        unit: 'g',
        quantity: 200,
      },
    ]);
  });

  describe('with ingredient', () => {
    let cheeseId: string;

    beforeEach(() => {
      const cheese = repository.addIngredient({
        recipeId: 'burger',
        ingredientData: {
          name: 'Cheese',
          unit: 'g',
          quantity: 50,
        },
      });
      cheeseId = cheese.id;
    });

    it('should update ingredient', () => {
      repository.updateIngredient({
        ingredientId: cheeseId,
        changes: {
          quantity: 60,
        },
      });

      const ingredients = repository.getRecipeIngredients('burger');
      expect(ingredients).toEqual([
        {
          id: expect.any(String),
          name: 'Cheese',
          unit: 'g',
          quantity: 60,
        },
      ]);
    });

    it(`should get ingredient's recipe id`, () => {
      const recipeId = repository.getIngredientRecipeId(cheeseId);
      expect(recipeId).toEqual('burger');
    });
  });
});
