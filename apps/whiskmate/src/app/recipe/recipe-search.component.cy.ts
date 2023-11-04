import { RecipeSearchComponent } from './recipe-search.component';
import { provideRecipeRepositoryFake } from './recipe-repository.fake';

describe(RecipeSearchComponent.name, () => {
  xit('🚧 should show recipes', () => {
    throw new Error('🚧 work in progress!');
  });

  xit('🚧 should filter recipes', () => {
    throw new Error('🚧 work in progress!');
  });

  xit('🚧 should add recipe to meal plan', () => {
    throw new Error('🚧 work in progress!');
  });

  xit('🚧 should disable add button if recipe is already in meal plan', () => {
    throw new Error('🚧 work in progress!');
  });

  function renderComponent() {
    cy.mount(RecipeSearchComponent, {
      providers: [provideRecipeRepositoryFake()],
    });

    return {
      findFirstAddButton() {
        throw new Error('🚧 work in progress!');
      },
      findRecipeNames() {
        throw new Error('🚧 work in progress!');
      },
      getMealPlannerRecipeNames() {
        throw new Error('🚧 work in progress!');
      },
      setFilter({ keywords }: { keywords: string }) {
        throw new Error('🚧 work in progress!');
      },
    };
  }
});
