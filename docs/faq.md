# FAQ

## `wm-recipe-filter` is not a known element

This is a shallow test. We don't want to load child components as they are probably not even implemented yet.

Apply `CUSTOM_ELEMENTS_SCHEMA` to allow unknown elements:

```typescript
TestBed.configureTestingModule({
  ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
}).compileComponents();
```

## Not getting the expected result

- [ ] Did you trigger change detection with `fixture.detectChanges()`?
- [ ] Did you `await` all functions that return a promise? (e.g. harnesses)

## How to mock a function that returns an observable?

You can use `of` function to create a hardcoded observable.

```typescript
mock.mockReturnValue(of(42));
```

## Cypress harness error `cy.click() failed because it requires a DOM element.`

There could be some collisions between harnesses and Cypress functions.
If this happens, you can use `harness.invoke('click')` instead.
