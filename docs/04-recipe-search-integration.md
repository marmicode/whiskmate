# Setup

```sh
git checkout origin/testing-06-recipe-search-integration-boilerplate

yarn
```

# 🎯 Goal: Test `<wm-recipe-search>`

Same goal as [previous exercise](03-recipe-search-isolated.md) _(i.e. `<wm-recipe-search>` should call `RecipeRepository.search()` on startup.)_

But let's check the DOM this time.

**Implement tests** for `<wm-recipe-search>` and make sure that:

1. recipe names are displayed. Recipe name elements can be queried using `[data-role="recipe-name"]`:

```html
<h2 data-role="recipe-name">{{ recipe.name }}</h2>
```

# 📝 Steps

1. Run tests:

```sh
yarn test whiskmate --watch
```

2. Implement tests:

   1. Import component's module using:

   ```ts
   TestBed.configureTestingModule({
     imports: [MyModule],
   });
   ```

   2. Mock `RecipeRepository.search` _(Cf. [mock provider](03-recipe-search-isolated.md#-tip-mock-provider) & [type safety](03-recipe-search-isolated.md#-tip-class-type-safety-) & [mock function returning observable](03-recipe-search-isolated.md#-tip-mock-a-function-returning-an-observable))_.

   3. Trigger change detection by calling `fixture.detectChanges()`.

   4. Query DOM and check names are displayed. (Cf. [query DOM with `fixture.debugElement`](#-tip-query-dom-with-fixturedebugelement)])

   5. Check mock was called properly.

3. 🙏🛑 wait until you finish implementing the tests before running: 🛑🙏

```sh
git checkout origin/testing-07-recipe-search-integration apps/whiskmate/src/app/recipe/recipe-search.component.ts
```

# Appendices

## 🎁 Tip: Query DOM with `fixture.debugElement`

You can query one or multiple elements using, respectively, `query` and `queryAll` methods.

```ts
const step = fixture.debugElement.query(By.css('.step')).nativeElement
  .textContent;

const steps = fixture.debugElement
  .queryAll(By.css('.step'))
  .map((el) => el.nativeElement.textContent);
```

You can also query a component or directive using `By.directive` but we won't need it 😉.

```ts
fixture.debugElement.query(By.directive(RecipePreviewComponent));
```
