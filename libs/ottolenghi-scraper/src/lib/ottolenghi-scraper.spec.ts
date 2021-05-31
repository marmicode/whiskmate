import { join, resolve } from 'path';
import { scrapRecipeByUrl } from './ottolenghi-scraper';

describe(scrapRecipeByUrl.name, () => {
  it('should scrap recipe', async () => {
    const url = `file:${resolve(
      join(__dirname, '__tests__/fixtures/recipe.html')
    )}`;

    expect(await scrapRecipeByUrl(url)).toEqual({
      description:
        'This is a quick way to get a very comforting meal on the table in a wonderfully short amount of time. It’s a dish as happily eaten for brunch, with coffee, as it is for a light supper with some crusty white bread and a glass of wine. The leeks and spinach can be made up to a day ahead and kept in the fridge, ready for the eggs to be cracked in and braised.',
      id: 'recipe.html',
      name: 'Braised eggs with leek and za’atar',
      ingredients: [
        {
          quantity: {
            amount: 30,
            unit: 'g',
          },
          name: 'unsalted butter',
        },
        {
          quantity: {
            amount: 2,
            unit: 'tbsp',
          },
          name: 'olive oil',
        },
        {
          quantity: {
            amount: 2,
            unit: 'unit',
          },
          name:
            'large leeks (or 4 smaller), trimmed and cut into ½ cm slices (530g)',
        },
        {
          quantity: {
            amount: 1,
            unit: 'tsp',
          },
          name: 'cumin seeds, toasted and lightly crushed',
        },
        {
          quantity: {
            amount: 2,
            unit: 'unit',
          },
          name:
            'small preserved lemons, pips discarded, skin and flesh finely chopped (30g)',
        },
        {
          quantity: {
            amount: 300,
            unit: 'ml',
          },
          name: 'vegetable stock 200g baby spinach leaves',
        },
        {
          quantity: {
            amount: 6,
            unit: 'unit',
          },
          name: 'large eggs',
        },
        {
          quantity: {
            amount: 90,
            unit: 'g',
          },
          name: 'feta, broken into 2cm pieces',
        },
        {
          quantity: {
            amount: 1,
            unit: 'tbsp',
          },
          name: "za'atar",
        },
        {
          name: 'salt and black pepper',
        },
      ],
      pictureUri:
        'https://ottolenghi.co.uk/media/contentmanager/content/cache/646x458//Braised-eggs-with-leek-and-za%E2%80%99atar.jpg',
      steps: [
        'Put the butter and 1 tablespoon of oil into a large sauté pan, for which you have a lid, and place on a medium high heat. Once the butter starts to foam, add the leeks, ½ teaspoon of salt and plenty of pepper. Fry for 3 minutes, stirring frequently, until the leeks are soft. Add the cumin, lemon and vegetable stock and boil rapidly for 4–5 minutes, until most of the stock has evaporated. Fold in the spinach and cook for a minute, until wilted, then reduce the heat to medium.',
        'Use a large spoon to make 6 indentations in the mixture and break one egg into each space. Sprinkle the eggs with a pinch of salt, dot the feta around the eggs, then cover the pan. Simmer for 4–5 minutes, until the egg whites are cooked but the yolks are still runny.',
        'Mix the za’atar with the remaining tablespoon of oil and brush over the eggs. Serve at once, straight from the pan.',
      ],
    });
  });
});
