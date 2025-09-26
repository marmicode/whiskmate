---
sidebar_label: 304 - Recipe Search Async Pipe
---

# Recipe Search Async Pipe

## Setup

```sh
pnpm cook start 304-recipe-search-async-pipe
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal: Use `async` pipe and fix tests

Let's go reactive and see what happens.

### 📝 Steps

1. Run tests:

```sh
pnpm test
```

2. Checkout new `RecipeSearch` implementation.

```sh
pnpm cook checkout-impl
```

> This will replace the imperative approach:
>
> ```ts
> @Component({
>   template: `{{ recipes }}`,
> })
> class RecipeSearch {
>   ngOnInit() {
>     this._repo.search().subscribe((recipes) => (this.recipes = recipes));
>   }
> }
> ```
>
> with a reactive approach:
>
> ```ts
> @Component({
>   template: `{{ recipes$ | async }}`,
> })
> class RecipeSearch {
>   recipes$ = this._repo.search();
> }
> ```

3. 👀 See which tests broke.

4. Fix tests.
