# Setup

```sh
git switch testing-503-recipe-search-ct-starter
```

# 🎯 Goal #1: Check that `RecipeSearchComponent` shows all recipes

`RecipeSearchComponent` should show all recipes returned by `RecipeRepository`.

## 📝 Steps

1. Run tests:

```sh
pnpm nx test-ui --ui
```

2. Open [`recipe-search.component.pw.ts`](../apps/whiskmate/src/app/recipe/recipe-search.component.pw.ts)

3. Arrange fake recipe repository in the constructor of the [Test Container component](../apps/whiskmate/src/app/recipe/recipe-search.test-container.ts).

```typescript
import { recipeMother } from './recipe.mother';

@Component({
  providers: [provideRecipeRepositoryFake()],
})
class RecipeSearchTestContainerComponent {
  private _recipeRepositoryFake = inject(RecipeRepositoryFake);

  constructor() {
    this._recipeRepositoryFake.setRecipes([recipeMother.withBasicInfo('Burger').build(), recipeMother.withBasicInfo('Salad').build()]);
  }
}
```

4. Find all recipe names using `getByRole()`.

5. Check that all recipe names are shown.

# 🎯 Goal #2: Check that `RecipeSearchComponent` filters recipes based on user criteria

`RecipeSearchComponent` should filter recipes based on user criteria.

## 📝 Steps

1. Set the `keywords` input value as we already did in [`recipe-filter.component.pw.ts`](../apps/whiskmate/src/app/recipe/recipe-filter.component.pw.ts).

2. Check that only recipes with matching keywords are shown.

# 🎯 Goal #3: Check that click "ADD" button adds the recipe to the meal plan

`RecipeSearchComponent` should add the recipe to the meal plan when "ADD" button is clicked.

## 📝 Steps

1. Find the "ADD" button using `getByRole()`.

2. Click the "ADD" button.

3. Check that the recipe has been added to the meal plan. _(Cf. [🎁 Tip: Notifying test of state changes](#-tip-notifying-test-of-state-changes))_

# 🎯 Goal #4: Check that the "ADD" button is disabled when the recipe is already in the meal plan

`RecipeSearchComponent` should disable the "ADD" button when the recipe is already in the meal plan.

While we could simply click the "ADD" button and check that the button is disabled, we will instead check that the button is disabled from the start. The main reason to this is that we want to make sure that the button is disabled based on the meal plan and not just because the button was clicked.

1. In order to arrange the state, we can add an input to our Test Container and control it from our test.

```typescript
class MyTestContainer {
  @Input() set mealPlannerRecipes(recipes: Recipe[]) {
    for (const recipe of recipes) {
      this._mealPlanner.addRecipe(recipe);
    }
  }
}
```

2. Check that the "ADD" button is disabled.

# Appendices

## 🎁 Tip: Notifying test of state changes

In order to notify the test when some state of the app changes, we can simply add outputs to the Test Container then spy them.

```typescript
class MyTestContainer {
    @Output() mealPlannerRecipesChange = inject(MealPlanner).recipes$;
}
...
test(..., async ({mount}) => {
    const component = await mount(MyTestContainer, {spyOutputs: ['mealPlannerRecipeChange']});
    ...
    expect(component.spies.mealPlannerRecipesChange).toHaveBeen...;
});
```
