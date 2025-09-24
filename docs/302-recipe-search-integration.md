---
sidebar_label: 302 - Recipe Search Integration
---

# Recipe Search Integration

# Setup

```sh
git switch testing-302-recipe-search-integration-starter
```

# 🎯 Goal #1: Test `RecipeSearch`

Same goal as [previous exercise](301-recipe-search-isolated.md) _(i.e. `RecipeSearch` should call `RecipeRepository.search()` on startup.)_

But let's check the DOM this time.

**Implement tests** for `RecipeSearch` and make sure that:

1. recipe names are displayed:

```html
...
<h2>Burger</h2>
...
```

## 📝 Steps

0. [optional] you can either checkout the updated `RecipeSearch` implementation first or go full-on TDD and implement the tests first.

```sh
git checkout origin/testing-302-recipe-search-integration-solution-test-bed apps/whiskmate/src/app/recipe/recipe-search.ng.ts
```

1. Run tests:

```sh
pnpm test
```

2. Implement tests:

   1. Query DOM and check names are displayed. (Cf. [query DOM with `fixture.debugElement`](#-tip-query-dom-with-fixturedebugelement)])

3. Checkout the implementation as mentioned at step 0 if you didn't do it already.

# 🎯 Goal #2: Test `RecipeSearch` using `@testing-library/angular`

Refactor the previous test using `@testing-library/angular` instead of `TestBed`.

## 🍴 Cutleries

- [🔗 Render function docs](https://testing-library.com/docs/angular-testing-library/api#render)
- [🔗 Testing Library Queries docs — or how to choose the right query](https://testing-library.com/docs/queries/about/)
- How to configure TestBed before mounting the component with Testing Library:

```ts
render(MyThing, {
  configureTestBed(testBed) {
    testBed.inject(MyFake).configure(someData);
  },
});
```

# Appendices

## 🎁 Tip: Query DOM with `fixture.debugElement`

You can query one or multiple elements using, respectively, `query` and `queryAll` methods.

```ts
const step = fixture.debugElement.query(By.css('.step')).nativeElement.textContent;

const steps = fixture.debugElement.queryAll(By.css('.step')).map((el) => el.nativeElement.textContent);
```
