# Setup

```sh
git checkout testing-04-recipe-search-isolated-boilerplate

yarn
```

# 🎯 Goal: Test `<wm-recipe-search>`

New component `<wm-recipe-search>` should call `RecipeRepository.search()` on startup.

**Implement tests** for `<wm-recipe-search>` and make sure that:

1. `recipes` property is set with the recipes returned by `RecipeRepository`.

```ts
export class RecipeSearchComponent {
  recipes: Recipe[];
}
```

# 📝 Steps

1. Run tests:

```sh
yarn test whiskmate --watch
```

2. Implement tests:

   1. Mock `RecipeRepository.search` _(Cf. [mock provider](#-tip-mock-provider) & [type safety](#-tip-class-type-safety-) & [mock function returning observable](#-tip-mock-a-function-returning-an-observable))_.

   2. Trigger initialization by calling `component.ngOnInit()`.

   3. Check `RecipeSearchComponent.recipes`.

   4. Check mock was called properly.

3. 🙏🛑 wait until you finish implementing the tests before running: 🛑🙏

```sh
git checkout testing-05-recipe-search-isolated apps/whiskmate/src/app/recipe/recipe-search.component.ts
```

# Appendices

## 🎁 Tip: Mock Provider 👍

```ts
function createComponent() {
  const mockDoSomething = jest.fn();

  TestBed.configureTestingModule({
    providers: [
      {
        provide: Service,
        useValue: {
          doSomething: mockDoSomething,
        },
      },
    ],
  });

  return {
    // ...
    mockDoSomething,
  };
}
```

## 🎁 Tip: Spy on existing service's method 😕 (can be useful in other cases)

```ts
const service = TestBed.inject(Service);
jest.spyOn(service, 'doSomething').mockReturnValue(42);
```

## 🎁 Tip: Class Type Safety 👍

```ts
const mockService = { doSomething: jest.fn() } as jest.Mocked<
  Pick<Service, 'doSomething'>
>;

// ...
      useValue: mockService,
// ...
```

## 🎁 Tip: Functional Type Safety 😕 (can be useful in other cases)

```ts
const mockDoSomething = jest.fn() as jest.MockedFunction<
  typeof Service.prototype.doSomething
>;

// ...
      useValue: {
        doSomething: mockDoSomething,
      } as Partial<Service>>,
// ...
```

## 🎁 Tip: Mock a function returning an observable

```ts
mock.mockReturnValue(of(42));
```
