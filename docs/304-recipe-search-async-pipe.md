# Setup

```sh
git checkout origin/testing-307-recipe-search-shallow
```

# 🎯 Goal: Use `async` pipe and fix tests

Let's go reactive and see what happens.

# 📝 Steps

1. Run tests:

```sh
pnpm test --watch
```

2. Checkout new `RecipeSearchComponent` implementation.

```sh
git checkout origin/testing-307-recipe-search-async-pipe apps/whiskmate/src/app/recipe/recipe-search.component.ts
```

> This will replace the imperative approach:
>
> ```ts
> @Component({
>  template: `{{ recipes }}`,
> })
> class {
>   ngOnInit() {this._repo.search().subscribe((recipes) => (this.recipes = recipes));
> }
> ```
>
> with a reactive approach:
>
> ```ts
> @Component({
>   template: `{{ recipes$ | async }}`,
> })
> class {
>   recipes$ = this._repo.search();
> }
> ```

3. 👀 See which tests broke.

4. Fix tests.
