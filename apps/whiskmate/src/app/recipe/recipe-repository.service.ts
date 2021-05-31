import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Recipe, createRecipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeRepository {
  private _recipes = [
    createRecipe({
      id: 'cauliflower',
      name: 'Cauliflower, pomegranate and pistachio salad',
      pictureUri:
        'https://ottolenghi.co.uk/media/contentmanager/content/cache/646x458//Cauliflower,-pomegranate-and-pistachio-salad.jpg',
      description:
        'It was a little moment of revelation, I remember, when I first combined roasted cauliflower and raw grated cauliflower in the same dish. So different from one another, but working so well combined. This is lovely as it is, served as part of a spread, or spooned alongside some roast chicken or lamb. Don’t throw away the leaves of the cauliflower here. They’re lovely to eat, roasted and crisp, or grated raw as you would the rest of the cauliflower. If you want to get ahead, roast the cauliflower up to 4–6 hours in advance. Keep at room temperature and then just combine with the remaining ingredients when ready to serve.',
      ingredients: [
        {
          quantity: {
            amount: 800,
            unit: 'g',
          },
          name: 'large cauliflower',
        },
        {
          quantity: {
            amount: 130,
            unit: 'g',
          },
          name: 'medium onion, roughly sliced',
        },
        {
          quantity: {
            amount: 80,
            unit: 'ml',
          },
          name: 'olive oil',
        },
        {
          quantity: {
            amount: 25,
            unit: 'g',
          },
          name: 'parsley, roughly chopped',
        },
        {
          quantity: {
            amount: 10,
            unit: 'g',
          },
          name: 'mint, roughly chopped',
        },
        {
          quantity: {
            amount: 10,
            unit: 'g',
          },
          name: 'tarragon, roughly chopped',
        },
        {
          quantity: {
            amount: 80,
            unit: 'g',
          },
          name: 'seeds from ½ medium pomegranate',
        },
        {
          quantity: {
            amount: 40,
            unit: 'g',
          },
          name: 'pistachio kernels, lightly toasted and roughly chopped',
        },
        {
          quantity: {
            amount: 1,
            unit: 'tsp',
          },
          name: 'ground cumin',
        },
        {
          quantity: {
            amount: 1.5,
            unit: 'tbsp',
          },
          name: 'lemon juice',
        },
        {
          name: 'salt',
        },
      ],
      steps: [
        'Preheat the oven to 200°C fan.',
        'Coarsely grate a third of the cauliflower and set aside in a bowl. Break the remaining cauliflower into florets, roughly 3cm wide, and add these to a separate bowl with the cauliflower leaves, if you have any, and onion. Toss everything together with 2 tablespoons of oil and ¼ teaspoon of salt, then spread out on a large parchment-lined baking tray. Roast for about 20 minutes, until cooked through and golden-brown. Remove from the oven and set aside to cool.',
        'Once cool, put the roasted vegetables into a large bowl with the 50ml oil, the grated cauliflower and the remaining ingredients, along with ¼ teaspoon of salt. Toss gently, just to combine, then transfer to a platter and serve.',
      ],
    }),
    createRecipe({
      id: 'braised-eggs',
      name: 'Braised eggs with leek and za’atar',
      pictureUri:
        'https://ottolenghi.co.uk/media/contentmanager/content/cache/646x458//Braised-eggs-with-leek-and-za%E2%80%99atar.jpg',
      description: '',
      steps: [],
      ingredients: [],
    }),
    createRecipe({
      id: 'buckwheat-hotcakes',
      name: 'Buckwheat and ricotta hotcakes with preserved lemon salsa',
      pictureUri:
        'https://ottolenghi.co.uk/media/contentmanager/content/cache/646x458//Buckwheat-and-ricotta-hotcakes-with-preserved-lemon-salsa.jpg',
      description: '',
      steps: [],
      ingredients: [],
    }),
    createRecipe({
      id: 'devilled-eggs',
      name: 'Devilled eggs with tangerine rayu',
      pictureUri:
        'https://ottolenghi.co.uk/media/contentmanager/content/cache/646x458//Devilled-eggs-with-tangerine-rayu.jpg',
      description: '',
      steps: [],
      ingredients: [],
    }),
    createRecipe({
      id: 'stuffed-romano',
      name: 'Stuffed Romano peppers with ricotta and mascarpone',
      pictureUri:
        'https://ottolenghi.co.uk/media/contentmanager/content/cache/646x458//Stuffed-Romano-peppers-with-ricotta-and-mascarpone.jpg',
      description: '',
      steps: [],
      ingredients: [],
    }),
  ];

  search({ keywords }: { keywords?: string }): Observable<Recipe[]> {
    if (keywords == null) {
      return of(this._recipes);
    }
    return of(
      this._recipes.filter((recipe) => {
        return recipe.name.includes(keywords);
      })
    );
  }
}
