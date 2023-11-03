# Setup

```sh
git checkout origin/testing-303-recipe-search-integration-starter
```

# 🎯 Goal: Test `<wm-recipe-search>`

Same goal as [previous exercise](301-recipe-search-isolated.md) _(i.e. `<wm-recipe-search>` should call `RecipeRepository.search()` on startup.)_

But let's check the DOM this time.

**Implement tests** for `<wm-recipe-search>` and make sure that:

1. recipe names are displayed. Recipe name elements can be queried using `[data-role="recipe-name"]`:

```html
<h2 data-role="recipe-name">{{ recipe.name }}</h2>
```

## 📝 Steps

0. [optional] you can either checkout the updated `RecipeSearchComponent` implementation first or go full-on TDD and implement the tests first.
```sh
git checkout origin/testing-304-recipe-search-integration apps/whiskmate/src/app/recipe/recipe-search.component.ts
```

1. Run tests:

```sh
pnpm test --watch
```

2. Implement tests:

   1. Query DOM and check names are displayed. (Cf. [query DOM with `fixture.debugElement`](#-tip-query-dom-with-fixturedebugelement)])

3. Checkout the implementation as mentioned at step 0 if you didn't do it already.

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
