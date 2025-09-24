# Setup

```sh
git switch testing-304-recipe-search-async-pipe-starter
```

# 🎯 Goal: Use `async` pipe and fix tests

Let's go reactive and see what happens.

## 📝 Steps

1. Run tests:

```sh
pnpm test
```

2. Checkout new `RecipeSearchComponent` implementation.

```sh
git checkout origin/testing-304-recipe-search-async-pipe-solution apps/whiskmate/src/app/recipe/recipe-search.ng.ts
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
