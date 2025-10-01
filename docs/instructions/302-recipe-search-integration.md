---
sidebar_label: 302 - Recipe Search Integration
---

# Recipe Search Integration

## Setup

```sh
pnpm cook start 302-recipe-search-integration-test-bed
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal #1: Test `RecipeSearch`

Same goal as [previous exercise](301-recipe-search-isolated.md) _(i.e. `RecipeSearch` should fetch recipes using `RecipeRepository` on startup.)_

But let's check the DOM this time.

**Implement tests** for `RecipeSearch` and make sure that:

#### 1. recipe names are displayed:

```html
...
<h2>Burger</h2>
...
```

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2.a. Configure the `TestBed` with real server:

```ts
TestBed.configureTestingModule({ providers: [provideHttpClient()] });
```

#### 2.b. Configure the `TestBed` with a test double:

```ts
TestBed.configureTestingModule({ providers: [provideRecipeRepositoryFake()] });
const fake = TestBed.inject(RecipeRepositoryFake);

/* Configure the fake. */
fake...
```

#### 3. Query DOM and check names are displayed. (Cf. [query DOM with `fixture.debugElement`](#-tip-query-dom-with-fixturedebugelement)])

#### 4. Checkout the implementation if you didn't do it already.

```sh
pnpm cook checkout-impl
```

## 🎯 Goal #2: Test `RecipeSearch` using `@testing-library/angular`

Refactor the previous test using `@testing-library/angular` instead of `TestBed`.

```sh
pnpm cook start 302-recipe-search-integration-testing-library
```

## 📖 Appendices

### 🔗 `@testing-library/angular`'s `render` docs

[https://testing-library.com/docs/angular-testing-library/api#render](https://testing-library.com/docs/angular-testing-library/api#render)

### 🔗 Testing Library Queries docs — or how to choose the right query

[https://testing-library.com/docs/queries/about](https://testing-library.com/docs/queries/about)

### 🎁 Tip: How to configure TestBed before mounting the component with Testing Library

```ts
render(MyThing, {
  configureTestBed(testBed) {
    testBed.inject(MyFake).configure(someData);
  },
});
```

### 🎁 Tip: Query DOM with `fixture.debugElement`

You can query one or multiple elements using, respectively, `query` and `queryAll` methods.

```ts
const step = fixture.debugElement.query(By.css('.step')).nativeElement.textContent;

const steps = fixture.debugElement.queryAll(By.css('.step')).map((el) => el.nativeElement.textContent);
```
